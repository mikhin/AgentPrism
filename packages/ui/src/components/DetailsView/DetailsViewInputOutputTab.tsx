import type { TraceSpan } from "@ai-agent-trace-ui/types";
import type { ReactElement } from "react";

import JSONPretty from "react-json-pretty";
import colors from "tailwindcss/colors";

import { CollapsibleSection } from "../CollapsibleSection";
import { Tabs } from "../Tabs";

interface DetailsViewInputOutputTabProps {
  data: TraceSpan;
}

interface IOContentProps {
  content?: string;
  sectionId: string;
}

const IOContent = ({ content, sectionId }: IOContentProps): ReactElement => {
  if (!content) {
    return (
      <p className="p-3 text-sm italic text-gray-500 dark:text-gray-400">
        No data available
      </p>
    );
  }

  if (!content) {
    return (
      <p className="p-3 text-sm italic text-gray-500 dark:text-gray-400">
        No data available
      </p>
    );
  }

  let parsedData = null;

  try {
    parsedData = JSON.parse(content);
  } catch {
    parsedData = null;
  }

  const tabItems = [
    {
      value: "json",
      label: "JSON",
      disabled: !parsedData,
      content: parsedData ? (
        <JSONPretty
          booleanStyle={`color: ${colors.blue[400]};`}
          className="overflow-x-auto rounded-xl p-4"
          data={parsedData}
          id={`json-pretty-${sectionId}`}
          keyStyle={`color: ${colors.blue[400]};`}
          mainStyle={`color: ${colors.gray[400]}; font-size: 12px;`}
          stringStyle={`color: ${colors.red[600]};`}
          valueStyle={`color: ${colors.red[600]};`}
        />
      ) : (
        <div className="p-4 text-sm text-gray-500 dark:text-gray-400">
          Invalid JSON format
        </div>
      ),
    },
    {
      value: "plain",
      label: "Plain",
      content: (
        <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
          <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs text-gray-800 dark:text-gray-200">
            {content}
          </pre>
        </div>
      ),
    },
  ];

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-600">
      <div className="p-3">
        <Tabs
          items={tabItems}
          defaultValue={parsedData ? "json" : "plain"}
          theme="pill"
          tabsListClassName="mb-3"
        />
      </div>
    </div>
  );
};

export const DetailsViewInputOutputTab = ({
  data,
}: DetailsViewInputOutputTabProps): ReactElement => {
  const hasInput = Boolean(data.input);
  const hasOutput = Boolean(data.output);

  if (!hasInput && !hasOutput) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          No input or output data available for this span.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {hasInput && (
        <CollapsibleSection title="Input" defaultOpen>
          <IOContent content={data.input} sectionId={`${data.id}-input`} />
        </CollapsibleSection>
      )}

      {hasOutput && (
        <CollapsibleSection title="Output" defaultOpen>
          <IOContent content={data.output} sectionId={`${data.id}-output`} />
        </CollapsibleSection>
      )}
    </div>
  );
};
