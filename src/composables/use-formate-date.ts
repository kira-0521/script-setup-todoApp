import { isRef, Ref, ref, computed } from 'vue'

export const useFormatDate = (date: string | Ref<string>) => {
  const dateRef = isRef(date) ? date : ref(date)
  return computed(() => {
    return `${dateRef.value}`
  })
}
