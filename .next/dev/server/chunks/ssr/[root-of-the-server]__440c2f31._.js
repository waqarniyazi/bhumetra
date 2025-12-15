module.exports = [
"[project]/lib/auth/session.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSession",
    ()=>createSession,
    "deleteSession",
    ()=>deleteSession,
    "getSession",
    ()=>getSession,
    "requireAuth",
    ()=>requireAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$3$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.1.3/node_modules/jose/dist/webapi/jwt/sign.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$3$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.1.3/node_modules/jose/dist/webapi/jwt/verify.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/headers.js [app-rsc] (ecmascript)");
;
;
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "bhumetra-secret-key-change-in-production");
const SESSION_COOKIE_NAME = "bhumetra-session";
const SESSION_EXPIRY_DAYS = 7;
async function createSession(user) {
    const expiresAt = new Date(Date.now() + SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
    const token = await new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$3$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SignJWT"]({
        userId: user._id,
        role: user.role,
        linkedEntityId: user.linkedEntityId,
        email: user.email,
        phone: user.phone
    }).setProtectedHeader({
        alg: "HS256"
    }).setExpirationTime(expiresAt).setIssuedAt().sign(JWT_SECRET);
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === "production",
        sameSite: "lax",
        expires: expiresAt,
        path: "/"
    });
    return token;
}
async function getSession() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;
    try {
        const { payload } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$3$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jwtVerify"])(token, JWT_SECRET);
        return {
            userId: payload.userId,
            role: payload.role,
            linkedEntityId: payload.linkedEntityId,
            email: payload.email,
            phone: payload.phone,
            expiresAt: new Date(payload.exp * 1000)
        };
    } catch  {
        return null;
    }
}
async function deleteSession() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.delete(SESSION_COOKIE_NAME);
}
async function requireAuth(allowedRoles) {
    const session = await getSession();
    if (!session) {
        throw new Error("Unauthorized");
    }
    if (allowedRoles && !allowedRoles.includes(session.role)) {
        throw new Error("Forbidden");
    }
    return session;
}
}),
"[project]/lib/types/index.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Enums and Types for Bhumetra
__turbopack_context__.s([
    "EntityStatus",
    ()=>EntityStatus,
    "Language",
    ()=>Language,
    "LeadSource",
    ()=>LeadSource,
    "LeadStatus",
    ()=>LeadStatus,
    "OrderStatus",
    ()=>OrderStatus,
    "PaymentStatus",
    ()=>PaymentStatus,
    "UserRole",
    ()=>UserRole
]);
var UserRole = /*#__PURE__*/ function(UserRole) {
    UserRole["FARMER"] = "FARMER";
    UserRole["AGENT"] = "AGENT";
    UserRole["LAB_TECH"] = "LAB_TECH";
    UserRole["ADMIN"] = "ADMIN";
    return UserRole;
}({});
var OrderStatus = /*#__PURE__*/ function(OrderStatus) {
    OrderStatus["PAYMENT_PENDING"] = "PAYMENT_PENDING";
    OrderStatus["PAID"] = "PAID";
    OrderStatus["SENT_TO_LAB"] = "SENT_TO_LAB";
    OrderStatus["UNDER_TESTING"] = "UNDER_TESTING";
    OrderStatus["COMPLETED"] = "COMPLETED";
    OrderStatus["CANCELLED"] = "CANCELLED";
    return OrderStatus;
}({});
var PaymentStatus = /*#__PURE__*/ function(PaymentStatus) {
    PaymentStatus["PENDING"] = "PENDING";
    PaymentStatus["SUCCESS"] = "SUCCESS";
    PaymentStatus["FAILED"] = "FAILED";
    PaymentStatus["REFUNDED"] = "REFUNDED";
    return PaymentStatus;
}({});
var EntityStatus = /*#__PURE__*/ function(EntityStatus) {
    EntityStatus["ACTIVE"] = "ACTIVE";
    EntityStatus["INACTIVE"] = "INACTIVE";
    return EntityStatus;
}({});
var LeadSource = /*#__PURE__*/ function(LeadSource) {
    LeadSource["WEBSITE"] = "WEBSITE";
    LeadSource["AGENT"] = "AGENT";
    LeadSource["OTHER"] = "OTHER";
    return LeadSource;
}({});
var LeadStatus = /*#__PURE__*/ function(LeadStatus) {
    LeadStatus["NEW"] = "NEW";
    LeadStatus["CONTACTED"] = "CONTACTED";
    LeadStatus["CONVERTED"] = "CONVERTED";
    return LeadStatus;
}({});
var Language = /*#__PURE__*/ function(Language) {
    Language["EN"] = "en";
    Language["HI"] = "hi";
    return Language;
}({});
}),
"[externals]/mongodb [external] (mongodb, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongodb", () => require("mongodb"));

module.exports = mod;
}),
"[project]/lib/db/mongodb.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/lib/db/collections.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/mongodb.ts [app-rsc] (ecmascript)");
;
async function getUsersCollection() {
    const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDatabase"])();
    return db.collection("users");
}
async function getFarmersCollection() {
    const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDatabase"])();
    return db.collection("farmers");
}
async function getAgentsCollection() {
    const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDatabase"])();
    return db.collection("agents");
}
async function getLabTechsCollection() {
    const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDatabase"])();
    return db.collection("labTechs");
}
async function getAdminsCollection() {
    const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDatabase"])();
    return db.collection("admins");
}
async function getOrdersCollection() {
    const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDatabase"])();
    return db.collection("orders");
}
async function getSoilReportsCollection() {
    const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDatabase"])();
    return db.collection("soilReports");
}
async function getLeadsCollection() {
    const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDatabase"])();
    return db.collection("leads");
}
async function getContactMessagesCollection() {
    const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDatabase"])();
    return db.collection("contactMessages");
}
async function getGlobalConfigCollection() {
    const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDatabase"])();
    return db.collection("globalConfig");
}
}),
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
"[project]/app/dashboard/farmer/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FarmerDashboardLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$session$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth/session.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/types/index.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$farmer$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/farmer.service.ts [app-rsc] (ecmascript)");
;
;
;
;
;
async function FarmerDashboardLayout({ children }) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$session$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSession"])();
    if (!session || session.role !== __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].FARMER) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/login");
    }
    const farmer = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$farmer$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFarmerById"])(session.linkedEntityId);
    if (!farmer) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/login");
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__440c2f31._.js.map