import { createSharedComposable } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { DEFAULT_EXCHANGE_RATES, getDailyExchangeRates } from '@/utils/financeHelper'

export const useFinanceRates = createSharedComposable(() => {
  const exchangeRates = ref(DEFAULT_EXCHANGE_RATES)

  onMounted(async () => {
    const { rates } = await getDailyExchangeRates()
    exchangeRates.value = rates
  })

  return { exchangeRates }
})
