import { useForm } from 'vee-validate';
import { computed } from 'vue';

type UseFormOptions = Parameters<typeof useForm>[0];
type UseFormResult = ReturnType<typeof useForm>;

export function useFormKit(options?: UseFormOptions) {
  const form = useForm(options) as UseFormResult;

  const defineField = (name: string, config?: any) => {
    const [model, props] = form.defineField(name, (state) => ({
      validateOnModelUpdate: true,
      ...(typeof config === 'function' ? config(state) : config),
    }));

    const enhancedProps = computed(() => ({
      ...props.value,
      error: form.errors.value[name],
      touched: form.isFieldTouched(name),
    }));

    return [model, enhancedProps] as const;
  };

  return {
    ...form,
    defineField,
  };
}
