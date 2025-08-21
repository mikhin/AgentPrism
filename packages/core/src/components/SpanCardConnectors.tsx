interface SpanCardHorizontalConnectorProps {
  level: number;
  hasCollapseButton: boolean;
  stepLength: number;
}

export const SpanCardHorizontalConnector = ({
  level,
  hasCollapseButton,
  stepLength,
}: SpanCardHorizontalConnectorProps) => {
  if (level === 0) return null;

  const horizontalLineWidth = hasCollapseButton
    ? stepLength * 0.5
    : stepLength * 0.5;

  return (
    <div
      className="absolute top-1.5 h-0.5 bg-gray-100 dark:bg-gray-800"
      style={{
        width: `${horizontalLineWidth}px`,
        left: `-${horizontalLineWidth}px`,
      }}
    />
  );
};

export const SpanCardVerticalConnector = () => {
  return (
    <div className="absolute -top-3 ml-1 h-[calc(100%-9px)] w-0.5 translate-x-1/2 transform bg-gray-100 dark:bg-gray-800" />
  );
};
