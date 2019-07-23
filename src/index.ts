import { OptionRules } from 'type-args';
import * as slugify from '@sindresorhus/slugify';
import chalk from 'chalk';
import * as stringLength from 'string-length';
import { join } from 'path';

export const optionsToUsage = function(
  optionRules: OptionRules,
  leadingSpaces: number = 0,
  lineWidth: number = Math.min(process.stdout.columns || 80, 80)
): string {
  let left = {}, values = {};
  for (const key in optionRules) {
    left[key] = '';
    const rule = optionRules[key];
    left[key] += ' '.repeat(leadingSpaces);
    if (rule.alias) {
      left[key] += chalk.bold(`-${rule.alias}, `);
    }
    left[key] += chalk.bold(`--${slugify(key)}`);

    switch (rule.type) {
      case 'string':
        left[key] += chalk.dim(' ' + chalk.underline('string'));
        break;
      case 'string[]':
        left[key] +=  chalk.dim(' ' + chalk.underline('string') + ' ...');
        break;
      case 'number':
        left[key] +=  chalk.dim(' ' + chalk.underline('number'));
        break;
      case 'number[]':
        left[key] +=  chalk.dim(' ' + chalk.underline('number') + ' ...');
        break;
      case 'boolean':
        break;
    }
  }
  const longest = (Object.values(left) as string[]).reduce((p, c) => {
    return Math.max(p, stringLength(c));
  }, 0);
  const targetLength = longest + 4;
  for (const key in optionRules) {
    const padding = ' '.repeat(targetLength - stringLength(left[key]));
    values[key] = left[key] + padding + optionRules[key].desc;
  }
  return (Object.values(values) as string[]).join('\n');
};
