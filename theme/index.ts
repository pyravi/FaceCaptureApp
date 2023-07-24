import { dark } from './dark';
import { light } from './light';

export type ThemeType = typeof dark & typeof dark;

export { dark, light };
