module.exports = [
"[project]/lib/services/farmer.service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createFarmer",
    ()=>createFarmer,
    "getAllFarmers",
    ()=>getAllFarmers,
    "getFarmerById",
    ()=>getFarmerById,
    "getFarmerByPhone",
    ()=>getFarmerByPhone,
    "getFarmersByAgentId",
    ()=>getFarmersByAgentId,
    "updateFarmer",
    ()=>updateFarmer
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$collections$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/collections.ts [app-rsc] (ecmascript)");
;
;
async function createFarmer(farmer) {
    const collection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$collections$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFarmersCollection"])();
    const now = new Date();
    const doc = {
        ...farmer,
        createdAt: now,
        updatedAt: now
    };
    const result = await collection.insertOne(doc);
    return {
        ...doc,
        _id: result.insertedId.toString()
    };
}
async function getFarmerById(id) {
    const collection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$collections$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFarmersCollection"])();
    return await collection.findOne({
        _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](id)
    });
}
async function getFarmerByPhone(phone) {
    const collection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$collections$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFarmersCollection"])();
    return await collection.findOne({
        phone
    });
}
async function getFarmersByAgentId(agentId) {
    const collection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$collections$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFarmersCollection"])();
    return await collection.find({
        createdByAgentId: agentId
    }).toArray();
}
async function getAllFarmers() {
    const collection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$collections$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFarmersCollection"])();
    return await collection.find({}).sort({
        createdAt: -1
    }).toArray();
}
async function updateFarmer(id, updates) {
    const collection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$collections$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFarmersCollection"])();
    const result = await collection.findOneAndUpdate({
        _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](id)
    }, {
        $set: {
            ...updates,
            updatedAt: new Date()
        }
    }, {
        returnDocument: "after"
    });
    return result;
}
}),
];

//# sourceMappingURL=lib_services_farmer_service_ts_4b26e28b._.js.map