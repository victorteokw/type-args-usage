import * as slugify from '@sindresorhus/slugify';
import chalk from 'chalk';
import * as stringLength from 'string-length';
import { OptionRules } from 'type-args';

export const title = function(content: string): string {
  return '\n' + chalk.bold.underline(content) + '\n\n';
}

export const body = function(
  content: string,
  leadingSpaces: number = 0,
  trailingSpaces: number = 0,
  lineWidth: number = Math.min(process.stdout.columns || 80, 80)
) {
  const effectiveWidth = lineWidth - leadingSpaces - trailingSpaces;
  const lines = content.match(new RegExp(`.{1,${effectiveWidth}}`, 'g')) as string[];
  return ' '.repeat(leadingSpaces) + lines.join(' '.repeat(trailingSpaces) + '\n' + ' '.repeat(leadingSpaces)) + '\n';
}

export const options = function(
  optionRules: OptionRules,
  leadingSpaces: number = 0,
  lineWidth: number = Math.min(process.stdout.columns || 80, 80)
): string {
  const left = {};
  const values = {};
  for (const key in optionRules) {
    if (optionRules.hasOwnProperty(key)) {
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
  }
  const longest = (Object.values(left) as string[]).reduce((p, c) => {
    return Math.max(p, stringLength(c));
  }, 0);
  const targetLength = longest + 4;
  for (const key in optionRules) {
    if (optionRules.hasOwnProperty(key)) {
      const padding = ' '.repeat(targetLength - stringLength(left[key]));
      const descLength = lineWidth - targetLength;
      const desc = (optionRules[key].desc.match(new RegExp(`.{1,${descLength}}`, 'g')) as string[]).join(`\n${' '.repeat(targetLength)}`);
      values[key] = left[key] + padding + desc;
    }
  }
  return (Object.values(values) as string[]).join('\n');
};
