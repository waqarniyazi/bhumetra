module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/mongodb [external] (mongodb, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongodb", () => require("mongodb"));

module.exports = mod;
}),
"[project]/lib/db/mongodb.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "getDatabase",
    ()=>getDatabase
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
;
if (!process.env.MONGODB_URI) {
    throw new Error("Please add your MongoDB URI to .env.local");
}
const uri = process.env.MONGODB_URI;
const options = {};
let client;
let clientPromise;
if ("TURBOPACK compile-time truthy", 1) {
    if (!global._mongoClientPromise) {
        client = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["MongoClient"](uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else //TURBOPACK unreachable
;
async function getDatabase() {
    const client = await clientPromise;
    return client.db("bhumetra");
}
const __TURBOPACK__default__export__ = clientPromise;
}),
"[project]/lib/db/collections.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAdminsCollection",
    ()=>getAdminsCollection,
    "getAgentsCollection",
    ()=>getAgentsCollection,
    "getContactMessagesCollection",
    ()=>getContactMessagesCollection,
    "getFarmersCollection",
    ()=>getFarmersCollection,
    "getGlobalConfigCollection",
    ()=>getGlobalConfigCollection,
    "getLabTechsCollection",
    ()=>getLabTechsCollection,
    "getLeadsCollection",
    ()=>getLeadsCollection,
    "getOrdersCollection",
    ()=>getOrdersCollection,
    "getSoilReportsCollection",
    ()=>getSoilReportsCollection,
    "getUsersCollection",
    ()=>getUsersCollection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/mongodb.ts [app-route] (ecmascript)");
;
async function getUsersCollection() {
    const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDatabase"])();
    return db.collection("users");
}
async function getFarmersCollection() {
    const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDatabase"])();
    return db.collection("farmers");
}
async function getAgentsCollection() {
    const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDatabase"])();
    return db.collection("agents");
}
async function getLabTechsCollection() {
    const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDatabase"])();
    return db.collection("labTechs");
}
async function getAdminsCollection() {
    const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDatabase"])();
    return db.collection("admins");
}
async function getOrdersCollection() {
    const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDatabase"])();
    return db.collection("orders");
}
async function getSoilReportsCollection() {
    const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDatabase"])();
    return db.collection("soilReports");
}
async function getLeadsCollection() {
    const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDatabase"])();
    return db.collection("leads");
}
async function getContactMessagesCollection() {
    const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDatabase"])();
    return db.collection("contactMessages");
}
async function getGlobalConfigCollection() {
    const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDatabase"])();
    return db.collection("globalConfig");
}
}),
"[project]/lib/services/lead.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createLead",
    ()=>createLead,
    "getAllLeads",
    ()=>getAllLeads,
    "updateLeadStatus",
    ()=>updateLeadStatus
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$collections$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/collections.ts [app-route] (ecmascript)");
;
;
async function createLead(lead) {
    const collection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$collections$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLeadsCollection"])();
    const now = new Date();
    const doc = {
        ...lead,
        status: "NEW",
        createdAt: now
    };
    const result = await collection.insertOne(doc);
    return {
        ...doc,
        _id: result.insertedId.toString()
    };
}
async function getAllLeads() {
    const collection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$collections$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLeadsCollection"])();
    return await collection.find({}).sort({
        createdAt: -1
    }).toArray();
}
async function updateLeadStatus(id, status) {
    const collection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$collections$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLeadsCollection"])();
    const result = await collection.findOneAndUpdate({
        _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](id)
    }, {
        $set: {
            status
        }
    }, {
        returnDocument: "after"
    });
    return result;
}
}),
"[project]/app/api/admin/leads/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$lead$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/lead.service.ts [app-route] (ecmascript)");
;
;
async function GET() {
    try {
        const leads = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$lead$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAllLeads"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            leads
        });
    } catch (error) {
        console.error("Error fetching leads:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to fetch leads"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__af1adbf3._.js.map