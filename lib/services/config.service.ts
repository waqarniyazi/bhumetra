import { getGlobalConfigCollection } from "@/lib/db/collections"
import { defaultConfig } from "@/lib/config"
import type { GlobalConfig } from "@/lib/types"

export async function getGlobalConfig(): Promise<GlobalConfig> {
  try {
    const collection = await getGlobalConfigCollection()
    const config = await collection.findOne({})

    if (!config) {
      // Initialize with default config if none exists
      await collection.insertOne({ ...defaultConfig, createdAt: new Date(), updatedAt: new Date() })
      return defaultConfig
    }

    return config
  } catch (error) {
    console.error("Error fetching global config:", error)
    return defaultConfig
  }
}

export async function updateGlobalConfig(updates: Partial<GlobalConfig>): Promise<GlobalConfig | null> {
  try {
    const collection = await getGlobalConfigCollection()
    const result = await collection.findOneAndUpdate(
      {},
      { $set: { ...updates, updatedAt: new Date() } },
      { returnDocument: "after", upsert: true },
    )
    return result
  } catch (error) {
    console.error("Error updating global config:", error)
    return null
  }
}
