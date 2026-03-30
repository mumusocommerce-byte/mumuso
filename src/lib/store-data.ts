export interface Store {
    id: number
    emirate: string
    mall: string
    phone: string
}

export const stores: Store[] = [
    { id: 1, emirate: "Abu Dhabi", mall: "Abu Dhabi Mall", phone: "+97128784322" },
    { id: 2, emirate: "Abu Dhabi", mall: "Al Maryah Island", phone: "+97128784975" },
    { id: 3, emirate: "Abu Dhabi", mall: "Al Wahda Mall", phone: "+97128864155" },
    { id: 4, emirate: "Abu Dhabi", mall: "Bawabat Al Souq", phone: "+97123095627" },
    { id: 5, emirate: "Abu Dhabi", mall: "Souq Al Jami", phone: "+971505746858" },
    { id: 6, emirate: "Abu Dhabi", mall: "World Trade Center", phone: "+97128868315" },
    { id: 7, emirate: "Abu Dhabi", mall: "Yas Mall", phone: "+97126343238" },
    { id: 8, emirate: "Abu Dhabi", mall: "Al Dhafra Mall", phone: "+97126271550" },
    { id: 9, emirate: "Abu Dhabi", mall: "Marina Mall", phone: "+97125659786" },
    { id: 10, emirate: "Abu Dhabi", mall: "Dalma Mall", phone: "+97126672292" },
    { id: 11, emirate: "Abu Dhabi", mall: "Khalifa City", phone: "+97128843359" },
    { id: 12, emirate: "Abu Dhabi", mall: "Al Forsan Abu Dhabi", phone: "+97126211633" },
    { id: 13, emirate: "Abu Dhabi", mall: "Al Falah Central Mall", phone: "+97125648860" },
    { id: 14, emirate: "Abu Dhabi", mall: "Al Seef Village", phone: "+97128830527" },
    { id: 15, emirate: "Abu Dhabi", mall: "Mushrif Mall", phone: "+97125640326" },
    { id: 16, emirate: "Abu Dhabi", mall: "Gardens Plaza", phone: "+97126434154" },
    { id: 17, emirate: "Abu Dhabi", mall: "Al Qana", phone: "+97128846432" },
    { id: 18, emirate: "Abu Dhabi", mall: "MBZ Mall", phone: "+97128778954" },
    { id: 19, emirate: "Abu Dhabi", mall: "Bawadi Mall", phone: "+97137348329" },
    { id: 20, emirate: "Ajman", mall: "Ajman City Center", phone: "+97167675425" },
    { id: 21, emirate: "Ajman", mall: "City Center Ajman", phone: "+97167675425" },
    { id: 22, emirate: "Al Ain", mall: "Al Ain Mall", phone: "+97137839171" },
    { id: 23, emirate: "Al Ain", mall: "Al Jimi Mall", phone: "+971504096225" },
    { id: 24, emirate: "Al Ain", mall: "UAEU", phone: "+97137530911" },
    { id: 25, emirate: "Al Ain", mall: "Makani Zakher Mall", phone: "+97137342761" },
    { id: 26, emirate: "Dubai", mall: "Al Ghurair Center", phone: "+971508921037" },
    { id: 27, emirate: "Dubai", mall: "Deira City Center", phone: "+971564028822" },
    { id: 28, emirate: "Dubai", mall: "Dubai Festival City", phone: "+971569901743" },
    { id: 29, emirate: "Dubai", mall: "Dubai Festival Plaza", phone: "+971508055152" },
    { id: 30, emirate: "Dubai", mall: "Galleria Mall Dubai", phone: "+971569901758" },
    { id: 31, emirate: "Dubai", mall: "Ibn Battuta Mall", phone: "+971545824733" },
    { id: 32, emirate: "Dubai", mall: "Al Khawaneej Walk", phone: "+97143252004" },
    { id: 33, emirate: "Dubai", mall: "New Meadows Village", phone: "+971565011056" },
    { id: 34, emirate: "Dubai", mall: "Mirdif City Center", phone: "+97142732488" },
    { id: 35, emirate: "Dubai", mall: "The Dubai Mall", phone: "+971501435152" },
    { id: 36, emirate: "Dubai", mall: "The Dubai Mall 2", phone: "+97148327337" },
    { id: 37, emirate: "Dubai", mall: "Motor City", phone: "+97142363760" },
    { id: 38, emirate: "Dubai", mall: "City Walk", phone: "+97145472595" },
    { id: 39, emirate: "Dubai", mall: "Umm Suqeim", phone: "+97145474670" },
    { id: 40, emirate: "Dubai", mall: "Dubai International Financial Center", phone: "+97145918695" },
    { id: 41, emirate: "Dubai", mall: "Dubai Festival City 2", phone: "+97147187245" },
    { id: 42, emirate: "Dubai", mall: "Jumeirah Beach Road", phone: "+97142323575" },
    { id: 43, emirate: "Dubai", mall: "Jumeirah Beach Road 2", phone: "+97142233419" },
    { id: 44, emirate: "Dubai", mall: "Blue Waters Island", phone: "+97142357055" },
    { id: 45, emirate: "Dubai", mall: "Nad Al Sheba", phone: "+97143365255" },
    { id: 46, emirate: "Dubai", mall: "Bay Avenues", phone: "+97143955449" },
    { id: 47, emirate: "Dubai", mall: "Dubai Hills", phone: "+97142855661" },
    { id: 48, emirate: "Dubai", mall: "Mirdif Hills", phone: "+97142253398" },
    { id: 49, emirate: "Dubai", mall: "Galleria Dubai - Al Wasl", phone: "+97145914011" },
    { id: 50, emirate: "Dubai", mall: "Bay Avenue - Business Bay", phone: "+97143945113" },
    { id: 51, emirate: "Dubai", mall: "Al Seef Dubai", phone: "+97146657293" },
    { id: 52, emirate: "Dubai", mall: "B1 Mall, Al Barsha First", phone: "+97145299360" },
    { id: 53, emirate: "Dubai", mall: "Mirdif Avenue Mall", phone: "+97142975054" },
    { id: 54, emirate: "Dubai", mall: "China Town", phone: "+97145703005" },
    { id: 55, emirate: "Dubai", mall: "Silicon Oasis Mall", phone: "+97143406183" },
    { id: 56, emirate: "Dubai", mall: "Dubai Creek Harbour", phone: "+97143315651" },
    { id: 57, emirate: "Dubai", mall: "Ventura Mall", phone: "+97148247815" },
    { id: 58, emirate: "Dubai", mall: "Galleria Al Barsha", phone: "+97143295106" },
    { id: 59, emirate: "Dubai", mall: "WAFI Mall", phone: "+97142574491" },
    { id: 60, emirate: "Dubai", mall: "Dubai Mall Zabeel", phone: "+97144919860" },
    { id: 61, emirate: "Dubai", mall: "Dubai Outlet Mall", phone: "+97145485863" },
    { id: 62, emirate: "Dubai", mall: "Global Village", phone: "+971549941253" },
    { id: 63, emirate: "Fujairah", mall: "Lulu Mall Fujairah", phone: "+971565369777" },
    { id: 64, emirate: "Fujairah", mall: "Fujairah City Center", phone: "+97196061845" },
    { id: 65, emirate: "Ras Al Khaimah", mall: "Al Manar Mall", phone: "+971506808527" },
    { id: 66, emirate: "Ras Al Khaimah", mall: "Grove Village", phone: "+97172082344" },
    { id: 67, emirate: "Ras Al Khaimah", mall: "Al Hamra Mall", phone: "+97172351071" },
    { id: 68, emirate: "Ras Al Khaimah", mall: "Makani Shamkha", phone: "+97128768993" },
    { id: 69, emirate: "Sharjah", mall: "Mega Mall", phone: "+971563698599" },
    { id: 70, emirate: "Sharjah", mall: "Sharjah City Center", phone: "+971568409118" },
    { id: 71, emirate: "Sharjah", mall: "Zero 6 Mall", phone: "+97167490833" },
    { id: 72, emirate: "Sharjah", mall: "Sahara Centre", phone: "+97167677120" },
    { id: 73, emirate: "Sharjah", mall: "Al Jada", phone: "+97165317322" },
    { id: 74, emirate: "Sharjah", mall: "Kalba", phone: "+97192565390" },
    { id: 75, emirate: "Sharjah", mall: "Al Zahia City Center", phone: "+97165778701" },
    { id: 76, emirate: "Sharjah", mall: "Suyouh Mall", phone: "+97165362978" },
    { id: 77, emirate: "Sharjah", mall: "One Mall Suyoh", phone: "+97165347695" },
    { id: 78, emirate: "Umm Al Quwain", mall: "UAQ Mall", phone: "+97165592970" },
    { id: 79, emirate: "Umm Al Quwain", mall: "Mall of UAQ", phone: "+97165639884" },
    { id: 80, emirate: "Abu Dhabi", mall: "Al Dhannah Mall, Ruwais", phone: "+97126456156" },
    { id: 81, emirate: "Abu Dhabi", mall: "UAE University", phone: "+971503818293" },
]

export const emirates = [
    "All Emirates",
    "Abu Dhabi",
    "Ajman",
    "Al Ain",
    "Dubai",
    "Fujairah",
    "Ras Al Khaimah",
    "Sharjah",
    "Umm Al Quwain",
]

export function getStoresByEmirate(emirate: string): Store[] {
    if (emirate === "All Emirates") return stores
    return stores.filter((s) => s.emirate === emirate)
}

export function getEmirateStoreCounts(): Record<string, number> {
    const counts: Record<string, number> = {}
    for (const store of stores) {
        counts[store.emirate] = (counts[store.emirate] || 0) + 1
    }
    return counts
}
