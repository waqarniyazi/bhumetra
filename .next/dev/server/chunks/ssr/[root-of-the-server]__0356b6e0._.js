module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/dashboard/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/dashboard/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/dashboard/lab/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/dashboard/lab/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/lib/config/index.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Global configuration defaults and helpers
__turbopack_context__.s([
    "calculateCommissions",
    ()=>calculateCommissions,
    "calculateOrderAmount",
    ()=>calculateOrderAmount,
    "defaultConfig",
    ()=>defaultConfig,
    "formatCurrency",
    ()=>formatCurrency,
    "formatDate",
    ()=>formatDate,
    "generateCustomerId",
    ()=>generateCustomerId
]);
const defaultConfig = {
    businessName: "Bhumetra",
    email: "info@bhumetra.com",
    phone: "+91 98765 43210",
    whatsApp: "+91 98765 43210",
    officeAddress: "123 Agricultural Hub, Sector 5, New Delhi, India 110001",
    baseTestPricePerAcre: 500,
    commission: {
        agent: 15,
        lab: 30,
        franchise: 10,
        platform: 45
    },
    languagesSupported: [
        "en",
        "hi"
    ]
};
function calculateOrderAmount(acres, pricePerAcre) {
    return acres * pricePerAcre;
}
function calculateCommissions(amount, rates) {
    return {
        agent: Math.round(amount * rates.agent / 100),
        lab: Math.round(amount * rates.lab / 100),
        franchise: Math.round(amount * rates.franchise / 100),
        platform: Math.round(amount * rates.platform / 100)
    };
}
function generateCustomerId() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(amount);
}
function formatDate(date, locale = "en-IN") {
    return new Date(date).toLocaleDateString(locale, {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}
}),
"[project]/lib/services/order.service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createOrder",
    ()=>createOrder,
    "getAllOrders",
    ()=>getAllOrders,
    "getOrderByCustomerId",
    ()=>getOrderByCustomerId,
    "getOrderById",
    ()=>getOrderById,
    "getOrdersByAgentId",
    ()=>getOrdersByAgentId,
    "getOrdersByFarmerId",
    ()=>getOrdersByFarmerId,
    "getOrdersByStatus",
    ()=>getOrdersByStatus,
    "markOrderAsPaid",
    ()=>markOrderAsPaid,
    "updateOrderStatus",
    ()=>updateOrderStatus,
    "updatePaymentStatus",
    ()=>updatePaymentStatus
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$collections$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/collections.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config/index.ts [app-rsc] (ecmascript)");
;
;
;
async function createOrder(order) {
    const collection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$collections$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOrdersCollection"])();
    const now = new Date();
    const doc = {
        ...order,
        createdAt: now,
        updatedAt: now
    };
    const result = await collection.insertOne(doc);
    return {
        ...doc,
        _id: result.insertedId.toString()
    };
}
async function getOrderById(id) {
    const collection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$collections$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOrdersCollection"])();
    return await collection.findOne({
        _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](id)
    });
}
async function getOrderByCustomerId(customerId) {
    const collection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$collections$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOrdersCollection"])();
    return await collection.findOne({
        customerId
    });
}
async function getOrdersByFarmerId(farmerId) {
    const collection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$collections$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOrdersCollection"])();
    return await collection.find({
        farmerId
    }).sort({
        createdAt: -1
    }).toArray();
}
async function getOrdersByAgentId(agentId) {
    const collection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$collections$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOrdersCollection"])();
    return await collection.find({
        agentId
    }).sort({
        createdAt: -1
    }).toArray();
}
async function getOrdersByStatus(statuses) {
    const collection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$collections$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOrdersCollection"])();
    return await collection.find({
        status: {
            $in: statuses
        }
    }).sort({
        createdAt: -1
    }).toArray();
}
async function getAllOrders() {
    const collection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$collections$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOrdersCollection"])();
    return await collection.find({}).sort({
        createdAt: -1
    }).toArray();
}
async function updateOrderStatus(id, status) {
    const collection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$collections$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOrdersCollection"])();
    const result = await collection.findOneAndUpdate({
        _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](id)
    }, {
        $set: {
            status,
            updatedAt: new Date()
        }
    }, {
        returnDocument: "after"
    });
    return result;
}
async function markOrderAsPaid(id, razorpayPaymentId) {
    const collection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$collections$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOrdersCollection"])();
    // Generate unique customer ID
    let customerId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateCustomerId"])();
    // Ensure uniqueness
    let existing = await collection.findOne({
        customerId
    });
    while(existing){
        customerId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateCustomerId"])();
        existing = await collection.findOne({
            customerId
        });
    }
    const result = await collection.findOneAndUpdate({
        _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](id)
    }, {
        $set: {
            status: "PAID",
            paymentStatus: "SUCCESS",
            customerId,
            razorpayPaymentId,
            updatedAt: new Date()
        }
    }, {
        returnDocument: "after"
    });
    return result;
}
async function updatePaymentStatus(id, paymentStatus) {
    const collection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$collections$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOrdersCollection"])();
    const result = await collection.findOneAndUpdate({
        _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](id)
    }, {
        $set: {
            paymentStatus,
            updatedAt: new Date()
        }
    }, {
        returnDocument: "after"
    });
    return result;
}
}),
"[project]/app/dashboard/lab/components/lab-overview.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "LabOverview",
    ()=>LabOverview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const LabOverview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call LabOverview() from the server but LabOverview is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/dashboard/lab/components/lab-overview.tsx <module evaluation>", "LabOverview");
}),
"[project]/app/dashboard/lab/components/lab-overview.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "LabOverview",
    ()=>LabOverview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const LabOverview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call LabOverview() from the server but LabOverview is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/dashboard/lab/components/lab-overview.tsx", "LabOverview");
}),
"[project]/app/dashboard/lab/components/lab-overview.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$lab$2f$components$2f$lab$2d$overview$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/app/dashboard/lab/components/lab-overview.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$lab$2f$components$2f$lab$2d$overview$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/app/dashboard/lab/components/lab-overview.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$lab$2f$components$2f$lab$2d$overview$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/dashboard/lab/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LabDashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$order$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/order.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/types/index.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$lab$2f$components$2f$lab$2d$overview$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/dashboard/lab/components/lab-overview.tsx [app-rsc] (ecmascript)");
;
;
;
;
async function LabDashboardPage() {
    const pendingOrders = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$order$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOrdersByStatus"])([
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].SENT_TO_LAB,
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].UNDER_TESTING
    ]);
    const completedOrders = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$order$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOrdersByStatus"])([
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].COMPLETED
    ]);
    const stats = {
        pendingSamples: pendingOrders.filter((o)=>o.status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].SENT_TO_LAB).length,
        underTesting: pendingOrders.filter((o)=>o.status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].UNDER_TESTING).length,
        completedToday: completedOrders.filter((o)=>{
            const today = new Date();
            const orderDate = new Date(o.updatedAt);
            return orderDate.toDateString() === today.toDateString();
        }).length,
        totalCompleted: completedOrders.length
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$lab$2f$components$2f$lab$2d$overview$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LabOverview"], {
        stats: stats,
        recentPending: pendingOrders.slice(0, 5)
    }, void 0, false, {
        fileName: "[project]/app/dashboard/lab/page.tsx",
        lineNumber: 20,
        columnNumber: 10
    }, this);
}
}),
"[project]/app/dashboard/lab/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/dashboard/lab/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0356b6e0._.js.map