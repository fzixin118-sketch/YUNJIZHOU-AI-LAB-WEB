/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  showSubtitle?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Logo({
  className = "",
  iconOnly = false,
  showSubtitle = true,
  size = "md",
}: LogoProps) {
  const dims = {
    sm: {
      emblem: "h-6",
      wordmark: "w-[92px]",
      title: "text-[12px]",
      subtitle: "text-[6px] w-[92px]",
      gap: "gap-1",
    },
    md: {
      emblem: "h-7 sm:h-8",
      wordmark: "w-[100px] sm:w-[112px]",
      title: "text-[13px] sm:text-[15px]",
      subtitle: "text-[6px] w-[100px] sm:text-[7px] sm:w-[112px]",
      gap: "gap-1 sm:gap-1.5",
    },
    lg: {
      emblem: "h-10",
      wordmark: "w-[140px]",
      title: "text-[19px]",
      subtitle: "text-[8px] w-[140px]",
      gap: "gap-2",
    },
    xl: {
      emblem: "h-14",
      wordmark: "w-[224px]",
      title: "text-[30px]",
      subtitle: "text-[11px] w-[224px]",
      gap: "gap-2.5",
    },
  }[size];

  return (
    <div
      className={`inline-flex items-center ${dims.gap} select-none ${className}`}
    >
      <img
        src="/yunjizhou-emblem-transparent.png"
        alt="云极洲科技图标"
        className={`${dims.emblem} w-auto shrink-0 object-contain drop-shadow-[0_2px_6px_rgba(0,178,254,0.28)]`}
        draggable={false}
      />
      {!iconOnly && (
        <span className="flex min-w-0 flex-col justify-center leading-none">
          <span
            className={`${dims.wordmark} ${dims.title} block whitespace-nowrap text-center font-black tracking-[0.02em] text-slate-900 drop-shadow-[0_1px_2px_rgba(255,255,255,0.55)] dark:text-white dark:drop-shadow-[0_1px_4px_rgba(0,0,0,0.55)]`}
            style={{
              fontFamily:
                "'YouSheBiaoTiHei', 'Alibaba PuHuiTi', 'PingFang SC', 'Microsoft YaHei', sans-serif",
            }}
          >
            云极洲科技
          </span>
          {showSubtitle && (
            <span
              className={`${dims.subtitle} mt-1 block whitespace-nowrap text-center font-sans font-medium uppercase tracking-[0.06em] text-slate-500 drop-shadow-[0_1px_2px_rgba(255,255,255,0.45)] dark:text-slate-400 dark:drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)]`}
            >
              YUNJIZHOU AI LAB
            </span>
          )}
        </span>
      )}
    </div>
  );
}
