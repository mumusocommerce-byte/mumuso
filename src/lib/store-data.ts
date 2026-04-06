export interface Store {
    id: number
    emirate: string
    mall: string
    phone: string
}

export const stores: Store[] = [
    // Abu Dhabi
    { id: 1, emirate: "Abu Dhabi", mall: "Abu Dhabi Mall", phone: "+97128784322" },
    { id: 2, emirate: "Abu Dhabi", mall: "Al Maryah Island - The Galleria", phone: "+97128784975" },
    { id: 3, emirate: "Abu Dhabi", mall: "Al Wahda Mall", phone: "+97128864151" },
    { id: 4, emirate: "Abu Dhabi", mall: "Bawabat Al Sharq Mall", phone: "+97123095627" },
    { id: 5, emirate: "Abu Dhabi", mall: "World Trade Center Mall", phone: "+97128868315" },
    { id: 6, emirate: "Abu Dhabi", mall: "Yas Mall", phone: "+97126271132" },
    { id: 7, emirate: "Abu Dhabi", mall: "Al Dhafra Mall", phone: "+97126271550" },
    { id: 8, emirate: "Abu Dhabi", mall: "Dalma Mall", phone: "+97126672292" },
    { id: 9, emirate: "Abu Dhabi", mall: "Khalifa City", phone: "+97128843359" },
    { id: 10, emirate: "Abu Dhabi", mall: "Al Forsan Abu Dhabi", phone: "+97126211633" },
    { id: 11, emirate: "Abu Dhabi", mall: "Al Falah Central Mall", phone: "+97125648860" },
    { id: 12, emirate: "Abu Dhabi", mall: "Al Seef Village", phone: "+97128830527" },
    { id: 13, emirate: "Abu Dhabi", mall: "Mushrif Mall", phone: "+97125640326" },
    { id: 14, emirate: "Abu Dhabi", mall: "Gardens Plaza", phone: "+97126434154" },
    { id: 15, emirate: "Abu Dhabi", mall: "Al Qana", phone: "+97126453562" },
    { id: 16, emirate: "Abu Dhabi", mall: "MBZ Mall", phone: "+97128778954" },
    { id: 17, emirate: "Abu Dhabi", mall: "Al Dhannah Mall, Ruwais", phone: "+97126456156" },
    { id: 18, emirate: "Abu Dhabi", mall: "Khalidya Mall", phone: "+97126434315" },
    { id: 19, emirate: "Abu Dhabi", mall: "Deerfields Mall", phone: "+97126504073" },
    { id: 20, emirate: "Abu Dhabi", mall: "Shaikh Zayed Grand Mosque", phone: "+971503504420" },
    { id: 21, emirate: "Abu Dhabi", mall: "Makani Shamkha", phone: "+97128768993" },
    { id: 22, emirate: "Abu Dhabi", mall: "Shams Boutik Mall", phone: "+97126312635" },
    { id: 23, emirate: "Abu Dhabi", mall: "City Centre Masdar", phone: "+97126334579" },
    { id: 24, emirate: "Abu Dhabi", mall: "Noya", phone: "+971564337507" },
    { id: 25, emirate: "Abu Dhabi", mall: "Shawamekh Central Mall", phone: "+97123098483" },
    { id: 26, emirate: "Abu Dhabi", mall: "Madinati", phone: "+97126786725" },
    { id: 27, emirate: "Abu Dhabi", mall: "Al Zeina Retail", phone: "+97124478745" },
    { id: 28, emirate: "Abu Dhabi", mall: "Al Foah Mall", phone: "+97137610982" },
    { id: 29, emirate: "Abu Dhabi", mall: "Makani Khalidiyah Gardens", phone: "+97126275778" },

    // Al Ain
    { id: 30, emirate: "Al Ain", mall: "Al Ain Mall", phone: "+97137839171" },
    { id: 31, emirate: "Al Ain", mall: "Al Jimi Mall", phone: "+97137343293" },
    { id: 32, emirate: "Al Ain", mall: "UAE University", phone: "0503818293" },
    { id: 33, emirate: "Al Ain", mall: "Makani Zakher Mall", phone: "+97137342761" },
    { id: 34, emirate: "Al Ain", mall: "Bawadi Mall", phone: "+97137348329" },
    { id: 35, emirate: "Al Ain", mall: "Hili Mall", phone: "+97137227845" },

    // Ajman
    { id: 36, emirate: "Ajman", mall: "City Center Ajman", phone: "+97167675425" },

    // Dubai
    { id: 37, emirate: "Dubai", mall: "Dubai Festival City", phone: "+971543804535" },
    { id: 38, emirate: "Dubai", mall: "Dubai Festival City 2", phone: "+97147187245" },
    { id: 39, emirate: "Dubai", mall: "Al Ghurair Centre", phone: "+97145918177" },
    { id: 40, emirate: "Dubai", mall: "Ibn Battuta Mall", phone: "+971545824733" },
    { id: 41, emirate: "Dubai", mall: "Deira City Center", phone: "+971564028822" },
    { id: 42, emirate: "Dubai", mall: "Dubai Festival Plaza", phone: "+97145915240" },
    { id: 43, emirate: "Dubai", mall: "Galleria Dubai - Al Wasl", phone: "+97145914011" },
    { id: 44, emirate: "Dubai", mall: "The Dubai Mall", phone: "+97147181140" },
    { id: 45, emirate: "Dubai", mall: "The Dubai Mall 2", phone: "+97148327337" },
    { id: 46, emirate: "Dubai", mall: "New Meadows Village", phone: "+97145758962" },
    { id: 47, emirate: "Dubai", mall: "Motor City", phone: "+97142363760" },
    { id: 48, emirate: "Dubai", mall: "City Walk", phone: "+97145472595" },
    { id: 49, emirate: "Dubai", mall: "Spinneys Umm Suqeim", phone: "+97145474670" },
    { id: 50, emirate: "Dubai", mall: "DIFC Gate Avenue", phone: "+97145918695" },
    { id: 51, emirate: "Dubai", mall: "JBR The Walk", phone: "+97142323575" },
    { id: 52, emirate: "Dubai", mall: "JBR The Walk 2", phone: "+97142233419" },
    { id: 53, emirate: "Dubai", mall: "Blue Water Island", phone: "+97142357055" },
    { id: 54, emirate: "Dubai", mall: "Nad Al Sheba", phone: "+97143365255" },
    { id: 55, emirate: "Dubai", mall: "Bay Avenue - Business Bay", phone: "+97143945113" },
    { id: 56, emirate: "Dubai", mall: "Dubai Hills Mall", phone: "+97142855661" },
    { id: 57, emirate: "Dubai", mall: "Mirdif Hills Mall", phone: "+97142253398" },
    { id: 58, emirate: "Dubai", mall: "Al Seef Dubai", phone: "+97146657293" },
    { id: 59, emirate: "Dubai", mall: "B1 Mall, Al Barsha First", phone: "+97145299360" },
    { id: 60, emirate: "Dubai", mall: "Mirdif Avenue Mall", phone: "+97142975054" },
    { id: 61, emirate: "Dubai", mall: "TDM - Mumu Family", phone: "+97142715845" },
    { id: 62, emirate: "Dubai", mall: "TDM - China Town", phone: "+97145703005" },
    { id: 63, emirate: "Dubai", mall: "Dubai Hills Mall - Mumu Family", phone: "+97142652999" },
    { id: 64, emirate: "Dubai", mall: "Silicon Oasis Mall", phone: "+97143406183" },
    { id: 65, emirate: "Dubai", mall: "Dubai Creek Harbour", phone: "+97143315651" },
    { id: 66, emirate: "Dubai", mall: "Ventura Mall", phone: "+97148247815" },
    { id: 67, emirate: "Dubai", mall: "Galleria Al Barsha", phone: "+97143295106" },
    { id: 68, emirate: "Dubai", mall: "WAFI Mall", phone: "+97142574491" },
    { id: 69, emirate: "Dubai", mall: "Dubai Mall Zabeel", phone: "+97144919860" },
    { id: 70, emirate: "Dubai", mall: "Dubai Outlet Mall", phone: "+97145485863" },
    { id: 71, emirate: "Dubai", mall: "Global Village", phone: "+971505994902" },
    { id: 72, emirate: "Dubai", mall: "Al Khawaneej Walk", phone: "+97143252004" },
    { id: 73, emirate: "Dubai", mall: "MCC", phone: "+97142732488" },
    { id: 74, emirate: "Dubai", mall: "Dubai Marina", phone: "+97125659786" },
    { id: 75, emirate: "Dubai", mall: "Al Barsha Coop Union", phone: "+97142384969" },
    { id: 76, emirate: "Dubai", mall: "Arabian Ranches III", phone: "+97142298150" },
    { id: 77, emirate: "Dubai", mall: "The Springs Souk", phone: "+97142542073" },
    { id: 78, emirate: "Dubai", mall: "Meaisem City Center", phone: "+97142298159" },
    { id: 79, emirate: "Dubai", mall: "Al Furjan South Pavilion", phone: "+97145753272" },
    { id: 80, emirate: "Dubai", mall: "Golden Mile Galleria Mall, Palm Jumeirah", phone: "+971501315611" },
    { id: 81, emirate: "Dubai", mall: "Nad Al Sheba Mall", phone: "+97143490479" },
    { id: 82, emirate: "Dubai", mall: "Reef Mall", phone: "+97143932523" },
    { id: 83, emirate: "Dubai", mall: "Jenna Wards Apartments", phone: "+97143288764" },
    { id: 84, emirate: "Dubai", mall: "Circle Mall", phone: "+971501071896" },

    // Fujairah
    { id: 85, emirate: "Fujairah", mall: "Lulu Mall Fujairah", phone: "+971502654475" },
    { id: 86, emirate: "Fujairah", mall: "City Center Fujairah", phone: "+97196061845" },

    // Ras Al Khaimah
    { id: 87, emirate: "Ras Al Khaimah", mall: "Al Manar Mall", phone: "+97172238000" },
    { id: 88, emirate: "Ras Al Khaimah", mall: "Grove Village", phone: "+97172082344" },
    { id: 89, emirate: "Ras Al Khaimah", mall: "Al Hamra Mall", phone: "+97172435958" },

    // Sharjah
    { id: 90, emirate: "Sharjah", mall: "Sharjah Mega Mall", phone: "+97165551125" },
    { id: 91, emirate: "Sharjah", mall: "City Center Sharjah", phone: "+971547916362" },
    { id: 92, emirate: "Sharjah", mall: "Zero 6 Mall", phone: "+97167490833" },
    { id: 93, emirate: "Sharjah", mall: "Sahara Centre", phone: "+97167677120" },
    { id: 94, emirate: "Sharjah", mall: "Aljada Sharjah", phone: "+97165317322" },
    { id: 95, emirate: "Sharjah", mall: "Kalba Waterfront Mall", phone: "+97192565390" },
    { id: 96, emirate: "Sharjah", mall: "Al Zahia City Centre", phone: "+97165778701" },
    { id: 97, emirate: "Sharjah", mall: "Suyouh Mall", phone: "+97165362978" },
    { id: 98, emirate: "Sharjah", mall: "One Mall Suyoh", phone: "+97165347695" },
    { id: 99, emirate: "Sharjah", mall: "One Mall Rahmaniyah", phone: "+97165426720" },

    // Umm Al Quwain
    { id: 100, emirate: "Umm Al Quwain", mall: "Mall of UAQ", phone: "+97165592970" },

    // Abu Dhabi (continued)
    { id: 101, emirate: "Abu Dhabi", mall: "UAE University", phone: "" },
    { id: 102, emirate: "Abu Dhabi", mall: "Marina Mall", phone: "+97125659786" },
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
