import { describe, it, expect } from 'vitest';
import { ALL_ENHANCED_TESTS } from '../shared/new-psychology-tests-enhanced';
import { calculateNewPsychologyResult } from '../shared/new-psychology-tests';

const REQUIRED_ANALYSIS_FIELDS = [
  'titleZh', 'titleZhCN', 'titleEn',
  'overviewZh', 'overviewZhCN', 'overviewEn',
  'characteristicsZh', 'characteristicsZhCN', 'characteristicsEn',
  'strengthsZh', 'strengthsZhCN', 'strengthsEn',
  'areasForGrowthZh', 'areasForGrowthZhCN', 'areasForGrowthEn',
  'lifeAdviceZh', 'lifeAdviceZhCN', 'lifeAdviceEn',
  'relationshipAdviceZh', 'relationshipAdviceZhCN', 'relationshipAdviceEn',
  'careerAdviceZh', 'careerAdviceZhCN', 'careerAdviceEn',
  'compatibleTypesZh', 'compatibleTypesZhCN', 'compatibleTypesEn',
];

describe('ALL_ENHANCED_TESTS data completeness', () => {
  describe('colorPersonality', () => {
    const types = ['red', 'blue', 'green', 'yellow'];
    types.forEach(type => {
      it(`should have complete data for ${type}`, () => {
        const entry = ALL_ENHANCED_TESTS.colorPersonality[type];
        expect(entry).toBeDefined();
        expect(entry.detailedAnalysis).toBeDefined();
        REQUIRED_ANALYSIS_FIELDS.forEach(field => {
          expect(entry.detailedAnalysis).toHaveProperty(field);
          const value = (entry.detailedAnalysis as any)[field];
          if (Array.isArray(value)) {
            expect(value.length).toBeGreaterThan(0);
          } else {
            expect(value).toBeTruthy();
          }
        });
      });
    });
  });

  describe('loveStyle', () => {
    const types = ['words', 'time', 'gifts', 'service', 'touch'];
    types.forEach(type => {
      it(`should have complete data for ${type}`, () => {
        const entry = (ALL_ENHANCED_TESTS.loveStyle as any)[type];
        expect(entry).toBeDefined();
        expect(entry.detailedAnalysis).toBeDefined();
        REQUIRED_ANALYSIS_FIELDS.forEach(field => {
          expect(entry.detailedAnalysis).toHaveProperty(field);
        });
      });
    });
  });

  describe('workStyle', () => {
    const types = ['leader', 'supporter', 'innovator', 'analyst', 'coordinator'];
    types.forEach(type => {
      it(`should have complete data for ${type}`, () => {
        const entry = (ALL_ENHANCED_TESTS.workStyle as any)[type];
        expect(entry).toBeDefined();
        expect(entry.detailedAnalysis).toBeDefined();
        REQUIRED_ANALYSIS_FIELDS.forEach(field => {
          expect(entry.detailedAnalysis).toHaveProperty(field);
        });
      });
    });
  });

  describe('creativityIndex', () => {
    const types = ['artistic', 'technical', 'conceptual', 'practical', 'experimental'];
    types.forEach(type => {
      it(`should have complete data for ${type}`, () => {
        const entry = (ALL_ENHANCED_TESTS.creativityIndex as any)[type];
        expect(entry).toBeDefined();
        expect(entry.detailedAnalysis).toBeDefined();
        REQUIRED_ANALYSIS_FIELDS.forEach(field => {
          expect(entry.detailedAnalysis).toHaveProperty(field);
        });
      });
    });
  });
});

describe('calculateNewPsychologyResult lookup', () => {
  it('color-personality result key matches enhanced data', () => {
    // Simulate answers that should give "red" as result
    const answers = [4, 1, 1, 1, 4, 1, 1, 1, 4, 1, 1, 1, 4, 1, 1, 1, 4, 1, 1, 1];
    const result = calculateNewPsychologyResult('color-personality', answers);
    expect(result).toBeDefined();
    const key = (result as any).type;
    expect(ALL_ENHANCED_TESTS.colorPersonality[key]).toBeDefined();
    expect(ALL_ENHANCED_TESTS.colorPersonality[key].detailedAnalysis).toBeDefined();
  });

  it('love-style result key matches enhanced data', () => {
    const answers = [4, 1, 1, 1, 1, 4, 1, 1, 1, 1, 4, 1, 1, 1, 1, 4, 1, 1, 1, 1];
    const result = calculateNewPsychologyResult('love-style', answers);
    expect(result).toBeDefined();
    const key = (result as any).style;
    expect((ALL_ENHANCED_TESTS.loveStyle as any)[key]).toBeDefined();
    expect((ALL_ENHANCED_TESTS.loveStyle as any)[key].detailedAnalysis).toBeDefined();
  });

  it('work-style result key matches enhanced data', () => {
    const answers = [4, 1, 1, 1, 1, 4, 1, 1, 1, 1, 4, 1, 1, 1, 1, 4, 1, 1, 1, 1];
    const result = calculateNewPsychologyResult('work-style', answers);
    expect(result).toBeDefined();
    const key = (result as any).role;
    expect((ALL_ENHANCED_TESTS.workStyle as any)[key]).toBeDefined();
    expect((ALL_ENHANCED_TESTS.workStyle as any)[key].detailedAnalysis).toBeDefined();
  });

  it('creativity-index result key matches enhanced data', () => {
    const answers = [4, 1, 1, 1, 1, 4, 1, 1, 1, 1, 4, 1, 1, 1, 1, 4, 1, 1, 1, 1];
    const result = calculateNewPsychologyResult('creativity-index', answers);
    expect(result).toBeDefined();
    const key = (result as any).type;
    expect((ALL_ENHANCED_TESTS.creativityIndex as any)[key]).toBeDefined();
    expect((ALL_ENHANCED_TESTS.creativityIndex as any)[key].detailedAnalysis).toBeDefined();
  });
});
