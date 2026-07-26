import { ENV } from "./env";

export type Role = "system" | "user" | "assistant" | "tool" | "function";

export type TextContent = {
  type: "text";
  text: string;
};

export type ImageContent = {
  type: "image_url";
  image_url: {
    url: string;
    detail?: "auto" | "low" | "high";
  };
};

export type FileContent = {
  type: "file_url";
  file_url: {
    url: string;
    mime_type?: "audio/mpeg" | "audio/wav" | "application/pdf" | "audio/mp4" | "video/mp4";
  };
};

export type MessageContent = string | TextContent | ImageContent | FileContent;

export type Message = {
  role: Role;
  content: MessageContent | MessageContent[];
  name?: string;
  tool_call_id?: string;
};

export type Tool = {
  type: "function";
  function: {
    name: string;
    description?: string;
    parameters?: Record<string, unknown>;
  };
};

export type ToolChoicePrimitive = "none" | "auto" | "required";
export type ToolChoiceByName = { name: string };
export type ToolChoiceExplicit = {
  type: "function";
  function: {
    name: string;
  };
};

export type ToolChoice = ToolChoicePrimitive | ToolChoiceByName | ToolChoiceExplicit;

export type InvokeParams = {
  messages: Message[];
  tools?: Tool[];
  toolChoice?: ToolChoice;
  tool_choice?: ToolChoice;
  maxTokens?: number;
  max_tokens?: number;
  outputSchema?: OutputSchema;
  output_schema?: OutputSchema;
  responseFormat?: ResponseFormat;
  response_format?: ResponseFormat;
};

export type ToolCall = {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
};

export type InvokeResult = {
  id: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: Role;
      content: string | Array<TextContent | ImageContent | FileContent>;
      tool_calls?: ToolCall[];
    };
    finish_reason: string | null;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

export type JsonSchema = {
  name: string;
  schema: Record<string, unknown>;
  strict?: boolean;
};

export type OutputSchema = JsonSchema;

export type ResponseFormat =
  | { type: "text" }
  | { type: "json_object" }
  | { type: "json_schema"; json_schema: JsonSchema };

const ensureArray = (value: MessageContent | MessageContent[]): MessageContent[] =>
  Array.isArray(value) ? value : [value];

const normalizeContentPart = (part: MessageContent): TextContent | ImageContent | FileContent => {
  if (typeof part === "string") {
    return { type: "text", text: part };
  }

  if (part.type === "text") {
    return part;
  }

  if (part.type === "image_url") {
    return part;
  }

  if (part.type === "file_url") {
    return part;
  }

  throw new Error("Unsupported message content part");
};

const normalizeMessage = (message: Message) => {
  const { role, name, tool_call_id } = message;

  if (role === "tool" || role === "function") {
    const content = ensureArray(message.content)
      .map((part) => (typeof part === "string" ? part : JSON.stringify(part)))
      .join("\n");

    return {
      role,
      name,
      tool_call_id,
      content,
    };
  }

  const contentParts = ensureArray(message.content).map(normalizeContentPart);

  // If there's only text content, collapse to a single string for compatibility
  if (contentParts.length === 1 && contentParts[0].type === "text") {
    return {
      role,
      name,
      content: contentParts[0].text,
    };
  }

  return {
    role,
    name,
    content: contentParts,
  };
};

const normalizeToolChoice = (
  toolChoice: ToolChoice | undefined,
  tools: Tool[] | undefined,
): "none" | "auto" | ToolChoiceExplicit | undefined => {
  if (!toolChoice) return undefined;

  if (toolChoice === "none" || toolChoice === "auto") {
    return toolChoice;
  }

  if (toolChoice === "required") {
    if (!tools || tools.length === 0) {
      throw new Error("tool_choice 'required' was provided but no tools were configured");
    }

    if (tools.length > 1) {
      throw new Error(
        "tool_choice 'required' needs a single tool or specify the tool name explicitly",
      );
    }

    return {
      type: "function",
      function: { name: tools[0].function.name },
    };
  }

  if ("name" in toolChoice) {
    return {
      type: "function",
      function: { name: toolChoice.name },
    };
  }

  return toolChoice;
};

type LlmProvider = "nvidia" | "openrouter" | "forge";

const PROVIDER_KEYS: Record<LlmProvider, () => string> = {
  nvidia: () => ENV.nvidiaApiKey?.trim() || "",
  openrouter: () => ENV.openRouterApiKey?.trim() || "",
  forge: () => ENV.forgeApiKey?.trim() || "",
};

const DEFAULT_PROVIDER_ORDER: LlmProvider[] = ["nvidia", "openrouter", "forge"];

const listConfiguredProviders = (): LlmProvider[] => {
  const forced = process.env.LLM_PROVIDER?.trim().toLowerCase() as LlmProvider | undefined;
  if (forced && forced in PROVIDER_KEYS && PROVIDER_KEYS[forced]()) {
    return [forced];
  }

  return DEFAULT_PROVIDER_ORDER.filter((provider) => Boolean(PROVIDER_KEYS[provider]()));
};

const resolveApiUrl = (provider: LlmProvider) => {
  if (provider === "nvidia") {
    return "https://integrate.api.nvidia.com/v1/chat/completions";
  }
  if (provider === "openrouter") {
    return "https://openrouter.ai/api/v1/chat/completions";
  }
  if (ENV.forgeApiUrl && ENV.forgeApiUrl.trim().length > 0) {
    return `${ENV.forgeApiUrl.replace(/\/$/, "")}/v1/chat/completions`;
  }
  return "https://forge.manus.im/v1/chat/completions";
};

const resolveModel = (provider: LlmProvider) => {
  if (provider === "nvidia") {
    // Pick any chat model from https://build.nvidia.com/models (Free Endpoint filter).
    return process.env.NVIDIA_MODEL?.trim() || "meta/llama-3.1-8b-instruct";
  }
  if (provider === "openrouter") {
    // openrouter/free auto-picks an available free model that matches request features.
    return process.env.OPENROUTER_MODEL?.trim() || "openrouter/free";
  }
  return process.env.LLM_MODEL?.trim() || "gpt-4o-mini";
};

const assertApiKey = () => {
  if (listConfiguredProviders().length === 0) {
    throw new Error(
      "No LLM API key configured. Set NVIDIA_API_KEY, OPENROUTER_API_KEY, or BUILT_IN_FORGE_API_KEY.",
    );
  }
};

const shouldFallback = (status: number) =>
  status === 429 || status === 502 || status === 503 || status === 504;

const buildHeaders = (provider: LlmProvider): Record<string, string> => {
  const headers: Record<string, string> = {
    "content-type": "application/json",
    authorization: `Bearer ${PROVIDER_KEYS[provider]()}`,
  };

  if (provider === "openrouter") {
    headers["HTTP-Referer"] = process.env.OPENROUTER_SITE_URL?.trim() || "https://mbti.hyphenjob.com";
    headers["X-OpenRouter-Title"] =
      process.env.OPENROUTER_SITE_NAME?.trim() || "MBTI AI Analyzer";
  }

  return headers;
};

const normalizeResponseFormat = ({
  responseFormat,
  response_format,
  outputSchema,
  output_schema,
}: {
  responseFormat?: ResponseFormat;
  response_format?: ResponseFormat;
  outputSchema?: OutputSchema;
  output_schema?: OutputSchema;
}):
  | { type: "json_schema"; json_schema: JsonSchema }
  | { type: "text" }
  | { type: "json_object" }
  | undefined => {
  const explicitFormat = responseFormat || response_format;
  if (explicitFormat) {
    if (explicitFormat.type === "json_schema" && !explicitFormat.json_schema?.schema) {
      throw new Error("responseFormat json_schema requires a defined schema object");
    }
    return explicitFormat;
  }

  const schema = outputSchema || output_schema;
  if (!schema) return undefined;

  if (!schema.name || !schema.schema) {
    throw new Error("outputSchema requires both name and schema");
  }

  return {
    type: "json_schema",
    json_schema: {
      name: schema.name,
      schema: schema.schema,
      ...(typeof schema.strict === "boolean" ? { strict: schema.strict } : {}),
    },
  };
};

async function invokeWithProvider(
  provider: LlmProvider,
  params: InvokeParams,
): Promise<InvokeResult> {
  const {
    messages,
    tools,
    toolChoice,
    tool_choice,
    outputSchema,
    output_schema,
    responseFormat,
    response_format,
  } = params;

  const payload: Record<string, unknown> = {
    model: resolveModel(provider),
    messages: messages.map(normalizeMessage),
  };

  if (tools && tools.length > 0) {
    payload.tools = tools;
  }

  const normalizedToolChoice = normalizeToolChoice(toolChoice || tool_choice, tools);
  if (normalizedToolChoice) {
    payload.tool_choice = normalizedToolChoice;
  }

  // Keep output caps conservative for free quotas.
  payload.max_tokens = provider === "forge" ? 32768 : 8192;
  if (provider === "forge") {
    payload.thinking = {
      budget_tokens: 128,
    };
  }

  const normalizedResponseFormat = normalizeResponseFormat({
    responseFormat,
    response_format,
    outputSchema,
    output_schema,
  });

  if (normalizedResponseFormat) {
    // Prefer json_object for broader free-model compatibility than json_schema.
    payload.response_format =
      (provider === "openrouter" || provider === "nvidia") &&
      normalizedResponseFormat.type === "json_schema"
        ? { type: "json_object" }
        : normalizedResponseFormat;
  }

  const response = await fetch(resolveApiUrl(provider), {
    method: "POST",
    headers: buildHeaders(provider),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    const error = new Error(
      `LLM invoke failed (${provider}): ${response.status} ${response.statusText} – ${errorText}`,
    ) as Error & { status?: number; provider?: LlmProvider };
    error.status = response.status;
    error.provider = provider;
    throw error;
  }

  return (await response.json()) as InvokeResult;
}

export async function invokeLLM(params: InvokeParams): Promise<InvokeResult> {
  assertApiKey();

  const providers = listConfiguredProviders();
  const failures: string[] = [];

  for (let i = 0; i < providers.length; i += 1) {
    const provider = providers[i];
    try {
      return await invokeWithProvider(provider, params);
    } catch (err) {
      const status = typeof (err as { status?: number })?.status === "number"
        ? (err as { status: number }).status
        : undefined;
      const message = err instanceof Error ? err.message : String(err);
      failures.push(message);

      const canTryNext = i < providers.length - 1 && (status === undefined || shouldFallback(status));
      if (!canTryNext) {
        break;
      }
      console.warn(`[LLM] ${provider} failed (${status ?? "unknown"}); trying next provider…`);
    }
  }

  throw new Error(failures[failures.length - 1] || "LLM invoke failed for all providers");
}
