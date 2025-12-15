(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__93a60b39._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/lib/types/index.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$3$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.1.3/node_modules/jose/dist/webapi/jwt/verify.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/types/index.ts [middleware-edge] (ecmascript)");
;
;
;
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "bhumetra-secret-key-change-in-production");
const SESSION_COOKIE_NAME = "bhumetra-session";
// Define route access rules
const routeAccessRules = {
    "/dashboard/farmer": [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["UserRole"].FARMER
    ],
    "/dashboard/agent": [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["UserRole"].AGENT
    ],
    "/dashboard/lab": [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["UserRole"].LAB_TECH
    ],
    "/dashboard/admin": [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["UserRole"].ADMIN
    ]
};
async function middleware(request) {
    const { pathname } = request.nextUrl;
    // Only check dashboard routes
    if (!pathname.startsWith("/dashboard")) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    // No token, redirect to login
    if (!token) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/login", request.url));
    }
    try {
        const { payload } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$3$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["jwtVerify"])(token, JWT_SECRET);
        const userRole = payload.role;
        // Check if user has access to this route
        for (const [route, allowedRoles] of Object.entries(routeAccessRules)){
            if (pathname.startsWith(route) && !allowedRoles.includes(userRole)) {
                // Redirect to their appropriate dashboard
                const correctDashboard = getDashboardForRole(userRole);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(correctDashboard, request.url));
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    } catch  {
        // Invalid token, redirect to login
        const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/login", request.url));
        response.cookies.delete(SESSION_COOKIE_NAME);
        return response;
    }
}
function getDashboardForRole(role) {
    switch(role){
        case __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["UserRole"].FARMER:
            return "/dashboard/farmer";
        case __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["UserRole"].AGENT:
            return "/dashboard/agent";
        case __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["UserRole"].LAB_TECH:
            return "/dashboard/lab";
        case __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["UserRole"].ADMIN:
            return "/dashboard/admin";
        default:
            return "/login";
    }
}
const config = {
    matcher: [
        "/dashboard/:path*"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__93a60b39._.js.map