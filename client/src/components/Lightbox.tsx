import type { ReactNode } from "react";

type LightBoxProps = {
  children: ReactNode;
};

function LightBox({ children }: LightBoxProps) {
  return (
    <div className="fixed top-0 left-0 min-h-full w-[100vw] z-50 flex justify-center items-center">
      <div className="absolute inset-0 bg-black opacity-80"></div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        {children}
      </div>
    </div>
  );
}

export default LightBox;
