import { NumberInput, Tooltip } from "@mantine/core";

interface UnstyledNumberInputProps {
  value: number;
  onChange?: ((value: string | number) => void) | undefined;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
}

function UnstyledNumberInput(props: UnstyledNumberInputProps) {
  const { value, onChange, onBlur } = props;

  return (
    <Tooltip label='Click to edit'>
      <NumberInput
        min={0}
        max={999}
        variant='unstyled'
        hideControls
        value={value}
        allowNegative={false}
        allowDecimal={false}
        thousandSeparator=','
        onChange={(newValue) => onChange && onChange(newValue)}
        onBlur={onBlur}
      />
    </Tooltip>
  );
}

export default UnstyledNumberInput;
