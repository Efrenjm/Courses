import { useForm } from 'vee-validate';

type UseFormOptions = Parameters<typeof useForm>[0];
type UseFormResult = ReturnType<typeof useForm>;

type DefineFieldConfig<TDefineField extends UseFormResult['defineField']> =
  Parameters<TDefineField>[1];
type DefineFieldLazyConfig<TDefineField extends UseFormResult['defineField']> =
  Extract<DefineFieldConfig<TDefineField>, (state: any) => any>;

function createDefineField<TDefineField extends UseFormResult['defineField']>(defineField: TDefineField): TDefineField {
  return ((
    name: Parameters<TDefineField>[0],
    extraConfig?: DefineFieldLazyConfig<TDefineField>
  ) =>
    defineField(name, (state) => ({
      validateOnModelUpdate: state.touched,
      ...(extraConfig ? extraConfig(state) : {}),
    }))) as TDefineField;
}

export function useFormKit(options?: UseFormOptions) {
  const form = useForm(options) as UseFormResult;
  const defineFieldWithDefaults = createDefineField(form.defineField);

  return {
    ...form,
    defineField: defineFieldWithDefaults,
  };
}
