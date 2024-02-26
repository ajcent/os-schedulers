import { Select, Tooltip } from "@mantine/core";

interface DropDownProps<T> {
  data: [string, T][];
  onChange: (value: T) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  defaultValue: string;
  unstyled?: boolean;
  leftSection?: React.ReactNode;
}

function DropDown<T>(props: DropDownProps<T>) {
  const { data, label, defaultValue, description, onChange } = props;
  const { leftSection = undefined, unstyled = false } = props;
  let choices = data.map((each) => ({ value: each[0], label: `${each[0]}` }));

  return (
    <Tooltip label='Click to see choices'>
      <Select
        description={description}
        leftSection={leftSection}
        checkIconPosition='right'
        rightSection={unstyled ? " " : ""}
        variant={unstyled ? "unstyled" : "default"}
        w='100%'
        label={label}
        data={choices}
        value={defaultValue}
        onChange={(value) =>
          onChange(data.find((each) => each[0] === value)![1])
        }
        allowDeselect={false}
        comboboxProps={{
          dropdownPadding: 0,
          transitionProps: { transition: "scale-y", duration: 200 },
        }}
      />
    </Tooltip>
  );
}

export default DropDown;
