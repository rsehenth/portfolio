// MDX Component Registry
// This file provides components for MDX using dynamic imports to avoid Vite parsing issues
// during config evaluation. Components are loaded at runtime.

// We use a Proxy to lazily load components only when accessed
const componentCache = new Map();

function createComponentLoader(componentPath: string) {
  return new Proxy({}, {
    get(target, prop) {
      if (prop === 'default' || prop === 'render' || prop === '$$render') {
        // This will be replaced at runtime
        return undefined;
      }
      return undefined;
    },
    apply(target, thisArg, args) {
      // This allows the proxy to be called as a component
      return undefined;
    }
  });
}

// Export placeholder components that will be replaced at render time
// The actual components are passed via the Content.components prop in [slug].astro
export const AnimatedChart = createComponentLoader('@/components/AnimatedChart.astro');
export const DataTable = createComponentLoader('@/components/DataTable.astro');
export const MetricCard = createComponentLoader('@/components/MetricCard.astro');
export const ProjectCard = createComponentLoader('@/components/ProjectCard.astro');
export const Tag = createComponentLoader('@/components/Tag.astro');
export const ArchitectureDiagram = createComponentLoader('@/components/ArchitectureDiagram.astro');
export const FlowDiagram = createComponentLoader('@/components/FlowDiagram.astro');
export const Callout = createComponentLoader('@/components/Callout.astro');
export const RoleBlocks = createComponentLoader('@/components/RoleBlocks.astro');
export const ComparisonBlock = createComponentLoader('@/components/ComparisonBlock.astro');
export const StatsGrid = createComponentLoader('@/components/StatsGrid.astro');
export const CaseMedia = createComponentLoader('@/components/CaseMedia.astro');
export const BasicView = createComponentLoader('@/components/BasicView.astro');
export const FullView = createComponentLoader('@/components/FullView.astro');
export const SeeFull = createComponentLoader('@/components/SeeFull.astro');

// For the mdx() integration config, we need a plain object
// But we can't import .astro files there. So we export this for reference.
export default {
  AnimatedChart,
  DataTable,
  MetricCard,
  ProjectCard,
  Tag,
  ArchitectureDiagram,
  FlowDiagram,
  Callout,
  RoleBlocks,
  ComparisonBlock,
  StatsGrid,
  CaseMedia,
  BasicView,
  FullView,
  SeeFull,
};
