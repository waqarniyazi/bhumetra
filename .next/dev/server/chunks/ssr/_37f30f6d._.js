module.exports = [
"[project]/lib/auth/mock-users.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MOCK_USERS",
    ()=>MOCK_USERS,
    "getMockUser",
    ()=>getMockUser,
    "verifyMockPassword",
    ()=>verifyMockPassword
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/types/index.ts [app-rsc] (ecmascript)");
;
const MOCK_USERS = {
    "farmer@demo.com": {
        password: "farmer123",
        user: {
            _id: "mock-farmer-user-001",
            role: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].FARMER,
            email: "farmer@demo.com",
            phone: "9876543210",
            linkedEntityId: "mock-farmer-001",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        entity: {
            _id: "mock-farmer-001",
            name: "Ramesh Kumar",
            phone: "9876543210",
            email: "farmer@demo.com",
            address: {
                line1: "Village Road",
                village: "Sundarnagar",
                tehsil: "Sadar",
                district: "Varanasi",
                state: "Uttar Pradesh",
                pinCode: "221001"
            },
            landSizeInAcres: 5,
            language: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Language"].HI,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    },
    "agent@demo.com": {
        password: "agent123",
        user: {
            _id: "mock-agent-user-001",
            role: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].AGENT,
            email: "agent@demo.com",
            phone: "9876543211",
            linkedEntityId: "mock-agent-001",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        entity: {
            _id: "mock-agent-001",
            name: "Suresh Yadav",
            phone: "9876543211",
            region: "Varanasi, Uttar Pradesh",
            status: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["EntityStatus"].ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    },
    "lab@demo.com": {
        password: "lab123",
        user: {
            _id: "mock-lab-user-001",
            role: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].LAB_TECH,
            email: "lab@demo.com",
            phone: "9876543212",
            linkedEntityId: "mock-lab-001",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        entity: {
            _id: "mock-lab-001",
            name: "Dr. Priya Singh",
            phone: "9876543212",
            labName: "Bhumetra Central Lab",
            status: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["EntityStatus"].ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    },
    "admin@demo.com": {
        password: "admin123",
        user: {
            _id: "mock-admin-user-001",
            role: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].ADMIN,
            email: "admin@demo.com",
            phone: "9876543213",
            linkedEntityId: "mock-admin-001",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        entity: {
            _id: "mock-admin-001",
            name: "Vikram Sharma",
            email: "admin@demo.com",
            phone: "9876543213",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    }
};
function getMockUser(identifier) {
    // Check by email
    if (MOCK_USERS[identifier]) {
        return MOCK_USERS[identifier];
    }
    // Check by phone
    for (const [email, data] of Object.entries(MOCK_USERS)){
        if (data.user.phone === identifier) {
            return data;
        }
    }
    return null;
}
function verifyMockPassword(identifier, password) {
    const mockUser = getMockUser(identifier);
    if (!mockUser) return false;
    return mockUser.password === password;
}
}),
"[project]/lib/auth/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0074fd108fb149848dd21d3814167c7117b229e074":"logout","00fa5700b400a99c64cc5055ed557e4e8a6f223140":"getCurrentUser","40543f94a8cb5aeba2504e5ff8cc2c6cab2fbbfb04":"login","40da694828dacbae3512bbac3683e7d9cb5790ac66":"signup"},"",""] */ __turbopack_context__.s([
    "getCurrentUser",
    ()=>getCurrentUser,
    "login",
    ()=>login,
    "logout",
    ()=>logout,
    "signup",
    ()=>signup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$session$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth/session.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/types/index.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$mock$2d$users$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth/mock-users.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
async function login(credentials) {
    const { identifier, password } = credentials;
    // Try mock users first (for demo purposes)
    const mockUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$mock$2d$users$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getMockUser"])(identifier);
    if (mockUser && (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$mock$2d$users$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["verifyMockPassword"])(identifier, password)) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$session$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSession"])(mockUser.user);
        const dashboardPath = getDashboardPath(mockUser.user.role);
        return {
            success: true,
            redirectTo: dashboardPath
        };
    }
    // Try database users (if MongoDB is connected)
    try {
        const { getUserByEmail, getUserByPhone, verifyPassword } = await __turbopack_context__.A("[project]/lib/services/user.service.ts [app-rsc] (ecmascript, async loader)");
        let user = await getUserByEmail(identifier);
        if (!user) {
            user = await getUserByPhone(identifier);
        }
        if (!user) {
            return {
                success: false,
                error: "Invalid credentials. Try demo accounts: farmer@demo.com, agent@demo.com, lab@demo.com, or admin@demo.com"
            };
        }
        const isValid = await verifyPassword(user, password);
        if (!isValid) {
            return {
                success: false,
                error: "Invalid password"
            };
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$session$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSession"])(user);
        const dashboardPath = getDashboardPath(user.role);
        return {
            success: true,
            redirectTo: dashboardPath
        };
    } catch (error) {
        // Database not connected, only mock users available
        return {
            success: false,
            error: "Invalid credentials. Try demo accounts: farmer@demo.com/farmer123, agent@demo.com/agent123, lab@demo.com/lab123, or admin@demo.com/admin123"
        };
    }
}
async function signup(data) {
    try {
        const { createUser, getUserByEmail, getUserByPhone } = await __turbopack_context__.A("[project]/lib/services/user.service.ts [app-rsc] (ecmascript, async loader)");
        const { createFarmer } = await __turbopack_context__.A("[project]/lib/services/farmer.service.ts [app-rsc] (ecmascript, async loader)");
        const { createAgent } = await __turbopack_context__.A("[project]/lib/services/agent.service.ts [app-rsc] (ecmascript, async loader)");
        const { createLabTech } = await __turbopack_context__.A("[project]/lib/services/labtech.service.ts [app-rsc] (ecmascript, async loader)");
        // Check if user already exists
        if (data.email) {
            const existingByEmail = await getUserByEmail(data.email);
            if (existingByEmail) {
                return {
                    success: false,
                    error: "Email already registered"
                };
            }
        }
        const existingByPhone = await getUserByPhone(data.phone);
        if (existingByPhone) {
            return {
                success: false,
                error: "Phone number already registered"
            };
        }
        let linkedEntityId;
        switch(data.role){
            case __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].FARMER:
                {
                    const farmer = await createFarmer({
                        name: data.name,
                        phone: data.phone,
                        email: data.email,
                        address: {
                            village: data.village || "",
                            district: data.district || "",
                            state: data.state || "India"
                        },
                        language: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Language"].EN
                    });
                    linkedEntityId = farmer._id;
                    break;
                }
            case __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].AGENT:
                {
                    const agent = await createAgent({
                        name: data.name,
                        phone: data.phone,
                        region: data.region || "",
                        status: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["EntityStatus"].ACTIVE
                    });
                    linkedEntityId = agent._id;
                    break;
                }
            case __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].LAB_TECH:
                {
                    const labTech = await createLabTech({
                        name: data.name,
                        phone: data.phone,
                        labName: data.labName || "",
                        status: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["EntityStatus"].ACTIVE
                    });
                    linkedEntityId = labTech._id;
                    break;
                }
            default:
                return {
                    success: false,
                    error: "Invalid role for signup"
                };
        }
        const user = await createUser({
            role: data.role,
            email: data.email,
            phone: data.phone,
            password: data.password,
            linkedEntityId
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$session$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSession"])(user);
        const dashboardPath = getDashboardPath(user.role);
        return {
            success: true,
            redirectTo: dashboardPath
        };
    } catch (error) {
        return {
            success: false,
            error: "Database not connected. Please use the demo login instead."
        };
    }
}
async function logout() {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$session$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteSession"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/login");
}
async function getCurrentUser() {
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$session$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSession"])();
}
function getDashboardPath(role) {
    switch(role){
        case __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].FARMER:
            return "/dashboard/farmer";
        case __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].AGENT:
            return "/dashboard/agent";
        case __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].LAB_TECH:
            return "/dashboard/lab";
        case __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].ADMIN:
            return "/dashboard/admin";
        default:
            return "/dashboard";
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    login,
    signup,
    logout,
    getCurrentUser
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(login, "40543f94a8cb5aeba2504e5ff8cc2c6cab2fbbfb04", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(signup, "40da694828dacbae3512bbac3683e7d9cb5790ac66", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(logout, "0074fd108fb149848dd21d3814167c7117b229e074", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCurrentUser, "00fa5700b400a99c64cc5055ed557e4e8a6f223140", null);
}),
"[project]/.next-internal/server/app/dashboard/admin/page/actions.js { ACTIONS_MODULE0 => \"[project]/lib/auth/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth/actions.ts [app-rsc] (ecmascript)");
;
}),
"[project]/.next-internal/server/app/dashboard/admin/page/actions.js { ACTIONS_MODULE0 => \"[project]/lib/auth/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "0074fd108fb149848dd21d3814167c7117b229e074",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logout"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$dashboard$2f$admin$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$lib$2f$auth$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/dashboard/admin/page/actions.js { ACTIONS_MODULE0 => "[project]/lib/auth/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth/actions.ts [app-rsc] (ecmascript)");
}),
"[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable import/no-extraneous-dependencies */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerServerReference", {
    enumerable: true,
    get: function() {
        return _server.registerServerReference;
    }
});
const _server = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)"); //# sourceMappingURL=server-reference.js.map
}),
"[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This function ensures that all the exported values are valid server actions,
// during the runtime. By definition all actions are required to be async
// functions, but here we can only check that they are functions.
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ensureServerEntryExports", {
    enumerable: true,
    get: function() {
        return ensureServerEntryExports;
    }
});
function ensureServerEntryExports(actions) {
    for(let i = 0; i < actions.length; i++){
        const action = actions[i];
        if (typeof action !== 'function') {
            throw Object.defineProperty(new Error(`A "use server" file can only export async functions, found ${typeof action}.\nRead more: https://nextjs.org/docs/messages/invalid-use-server-value`), "__NEXT_ERROR_CODE", {
                value: "E352",
                enumerable: false,
                configurable: true
            });
        }
    }
} //# sourceMappingURL=action-validate.js.map
}),
];

//# sourceMappingURL=_37f30f6d._.js.map