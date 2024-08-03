import { Input} from "@/components/ui/input";
import { Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";


interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: 'text' | 'textarea';
}

const FormField: React.FC<FormFieldProps> = ({ label, name, value, onChange, type = 'text' }) => {
  return (
    <div className="items-center inline-flex mb-2 sm:gap-3 sm:items-center py-2 sm:py-0.5">
      <Label>{label}</ Label>
      {type === 'text' ? (
        <Input 
          name={name}
          value={value}
          onChange={onChange}
        />
      ) : (
        <Textarea 
          name={name}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default FormField;