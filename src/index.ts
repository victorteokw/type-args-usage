import { OptionRules } from 'type-args';
import * as slugify from '@sindresorhus/slugify';

export const optionsToUsage = function(
  optionRules: OptionRules,
  leadingSpaces: number = 0,
  lineWidth: number = Math.min(process.stdout.columns || 80, 80)
): string {
  let retval = '';
  for (const key in optionRules) {
    const rule = optionRules[key];
    retval += ' '.repeat(leadingSpaces);
    retval += `--${slugify(key)}`;
    if (rule.alias) {
      retval += `,-${rule.alias}`;
    }
    switch (rule.type) {
      case 'string':
        retval += ' string';
        break;
      case 'string[]':
        retval += ' string...';
        break;
      case 'number':
        retval += ' number';
        break;
      case 'number[]':
        retval += ' number...';
        break;
      case 'boolean':
        break;
    }
    retval += ' ';
    retval += rule.desc;
  }
  return retval;
};
