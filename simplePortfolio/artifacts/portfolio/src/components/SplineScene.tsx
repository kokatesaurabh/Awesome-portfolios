import { Suspense, lazy, Component, type ReactNode } from "react";
import { Shield } from "lucide-react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

function Loader() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      </div>
      <p className="text-xs font-mono text-muted-foreground tracking-widest animate-pulse">LOADING 3D…</p>
    </div>
  );
}

function RobotFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-card to-background">
      <div className="relative">
        <div className="w-24 h-24 rounded-2xl border border-primary/40 bg-primary/5 flex items-center justify-center">
          <Shield size={40} className="text-primary opacity-80" />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#82f1f4] animate-pulse" />
      </div>
      <div className="text-center space-y-1">
        <p className="text-xs font-mono text-primary tracking-[0.3em] uppercase">3D Robot</p>
        <p className="text-xs text-muted-foreground font-mono">WebGL required to render</p>
      </div>
    </div>
  );
}

interface ErrorBoundaryState { hasError: boolean; }
class SplineErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <RobotFallback />;
    return this.props.children;
  }
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <SplineErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Spline scene={scene} className={className} />
      </Suspense>
    </SplineErrorBoundary>
  );
}
