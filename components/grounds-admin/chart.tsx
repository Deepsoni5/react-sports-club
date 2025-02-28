"use client";

import {
  BarChart as BarChartPrimitive,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  type TooltipProps,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const BarChart = ({
  data,
  xAxisKey,
  yAxisKey,
  className,
}: {
  data: any[];
  xAxisKey: string;
  yAxisKey: string;
  className?: string;
}) => {
  return (
    <ChartContainer className={className}>
      <ResponsiveContainer width="100%" height={350}>
        <BarChartPrimitive data={data}>
          <XAxis
            dataKey={xAxisKey}
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Bar
            dataKey={yAxisKey}
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          />
          <Tooltip content={<CustomTooltip />} />
        </BarChartPrimitive>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <ChartTooltip>
        <ChartTooltipContent>
          <p className="font-semibold">{label}</p>
          <p className="text-sm text-muted-foreground">
            {payload[0].value} bookings
          </p>
        </ChartTooltipContent>
      </ChartTooltip>
    );
  }
  return null;
};

export { BarChart, ResponsiveContainer, XAxis, YAxis, Bar };
