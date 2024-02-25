import { ActionIcon, Text } from "@mantine/core";
import "./GanttChart.css";

import Process from "classes/Process";

interface GanttChartProps {
  processes: Process[];
}

const GanttChart: React.FC<GanttChartProps> = (props) => {
  const { processes } = props;

  return (
    <ActionIcon.Group className='gantt-chart'>
      {processes.map((process, idx) => (
        <ActionIcon
          className='gantt-chart__item'
          style={{ position: "relative", overflow: "unset" }}
          size='3.25rem'
          variant='light'
          color='indigo'
          key={process.getJobId()}>
          <Text mr='1px'>{process.getJobName()}</Text>
          <Text style={{ fontSize: "0.85rem", translate: "0 25%" }}>
            {process.getRemainingBurstTime()}
          </Text>
          {!idx && <Text className='arrival'>{process.getArrivalTime()}</Text>}
          <Text className='end'>{process.getEndTime()}</Text>
        </ActionIcon>
      ))}
    </ActionIcon.Group>
  );
};

export default GanttChart;
