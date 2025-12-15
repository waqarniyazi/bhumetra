import { getSession } from "@/lib/auth/session"
import { getFarmersByAgentId } from "@/lib/services/farmer.service"
import { getGlobalConfig } from "@/lib/services/config.service"
import { CreateOrderForm } from "./components/create-order-form"

export default async function CreateOrderPage() {
  const session = await getSession()
  const farmers = await getFarmersByAgentId(session!.linkedEntityId)
  const config = await getGlobalConfig()

  return (
    <CreateOrderForm
      agentId={session!.linkedEntityId}
      existingFarmers={farmers}
      pricePerAcre={config.baseTestPricePerAcre}
    />
  )
}
