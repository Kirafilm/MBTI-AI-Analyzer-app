import { ALL_ENHANCED_TESTS } from './shared/new-psychology-tests-enhanced';

console.log('colorPersonality keys:', Object.keys(ALL_ENHANCED_TESTS.colorPersonality || {}));
console.log('loveStyle keys:', Object.keys(ALL_ENHANCED_TESTS.loveStyle || {}));
console.log('workStyle keys:', Object.keys(ALL_ENHANCED_TESTS.workStyle || {}));
console.log('creativityIndex keys:', Object.keys(ALL_ENHANCED_TESTS.creativityIndex || {}));

const red = ALL_ENHANCED_TESTS.colorPersonality?.red;
console.log('\nred has detailedAnalysis:', !!red?.detailedAnalysis);
console.log('red detailedAnalysis titleZh:', red?.detailedAnalysis?.titleZh);

const blue = ALL_ENHANCED_TESTS.colorPersonality?.blue;
console.log('blue has detailedAnalysis:', !!blue?.detailedAnalysis);

const green = ALL_ENHANCED_TESTS.colorPersonality?.green;
console.log('green has detailedAnalysis:', !!green?.detailedAnalysis);

const yellow = ALL_ENHANCED_TESTS.colorPersonality?.yellow;
console.log('yellow has detailedAnalysis:', !!yellow?.detailedAnalysis);

function checkFields(name: string, analysis: any) {
  const required = ['titleZh', 'overviewZh', 'characteristicsZh', 'strengthsZh', 'areasForGrowthZh', 'lifeAdviceZh', 'relationshipAdviceZh', 'careerAdviceZh', 'compatibleTypesZh'];
  const missing = required.filter(f => !analysis?.[f]);
  if (missing.length > 0) {
    console.log(`MISSING fields in ${name}:`, missing);
  } else {
    console.log(`${name}: ALL fields present`);
  }
}

console.log('\n--- Field Validation ---');
checkFields('color-red', red?.detailedAnalysis);
checkFields('color-blue', blue?.detailedAnalysis);
checkFields('color-green', green?.detailedAnalysis);
checkFields('color-yellow', yellow?.detailedAnalysis);

for (const key of Object.keys(ALL_ENHANCED_TESTS.loveStyle || {})) {
  checkFields(`love-${key}`, (ALL_ENHANCED_TESTS.loveStyle as any)[key]?.detailedAnalysis);
}
for (const key of Object.keys(ALL_ENHANCED_TESTS.workStyle || {})) {
  checkFields(`work-${key}`, (ALL_ENHANCED_TESTS.workStyle as any)[key]?.detailedAnalysis);
}
for (const key of Object.keys(ALL_ENHANCED_TESTS.creativityIndex || {})) {
  checkFields(`creativity-${key}`, (ALL_ENHANCED_TESTS.creativityIndex as any)[key]?.detailedAnalysis);
}
