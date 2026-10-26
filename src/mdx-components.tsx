import type { MDXComponents } from "mdx/types";
import { PlotChart } from "@/components/home/plot-chart";
import { Compare } from "@/components/work/compare";
import { BigResult, Blend, Chapter, Recipe, Results, Stat, Step, Steps } from "@/components/work/blocks";

const components: MDXComponents = {
  p: (props) => <p className="text-lede text-muted" {...props} />,
  a: (props) => <a className="text-accent underline decoration-current/30 underline-offset-4 hover:decoration-current" {...props} />,
  strong: (props) => <strong className="font-semibold text-fg" {...props} />,
  Recipe,
  Chapter,
  Steps,
  Step,
  Results,
  Stat,
  Blend,
  BigResult,
  Compare,
  PlotChart,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
