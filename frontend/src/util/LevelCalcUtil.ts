import { useSelector } from "react-redux"
import type { RootState } from "../store"

export function getLevel(xp: number) {
    let currentLevel = 1
    for (const level of levelIndex) {
        if (xp >= level.xp) {
            currentLevel = level.level
        } else {
            break
        }
    }
    return currentLevel
}

export function getNextLevelXP(xp: number) {
    const level = getLevel(xp)
    if (level == 200) {
        return 0
    } else {
        return levelIndex[level].xp
    }
}

export function getLevelProgress(xp: number) {
    const level = getLevel(xp)
    if (level === 200) return 100
    const relitiveXP = xp - levelIndex[level - 1].xp
    const relitiveNextlXP = levelIndex[level].xp - levelIndex[level - 1].xp
    return ((relitiveXP / relitiveNextlXP) * 100).toFixed(2)
}

export function getTotalLevel() {
    const skillData = useSelector((state: RootState) => state.skillData.Skills)
    type SkillName = keyof typeof skillData

    let total = 0
    for (const value of Object.keys(skillData) as SkillName[]) {
        total += getLevel(skillData[value])
    }
    return total
}

// used to create the xp table, IMPORTANT!!
export function generateXPTable() {
    for (let i = 1; i <= 200; i++) {
        console.log(`{level:${i}, xp:${Math.floor((100 * (i - 1)) * 1.09 ** (i - 2))}},`)
    }
}


const levelIndex = [
    { level: 1, xp: 0 },
    { level: 2, xp: 100 },
    { level: 3, xp: 218 },
    { level: 4, xp: 356 },
    { level: 5, xp: 518 },
    { level: 6, xp: 705 },
    { level: 7, xp: 923 },
    { level: 8, xp: 1173 },
    { level: 9, xp: 1462 },
    { level: 10, xp: 1793 },
    { level: 11, xp: 2171 },
    { level: 12, xp: 2604 },
    { level: 13, xp: 3096 },
    { level: 14, xp: 3656 },
    { level: 15, xp: 4292 },
    { level: 16, xp: 5012 },
    { level: 17, xp: 5827 },
    { level: 18, xp: 6749 },
    { level: 19, xp: 7789 },
    { level: 20, xp: 8962 },
    { level: 21, xp: 10283 },
    { level: 22, xp: 11769 },
    { level: 23, xp: 13439 },
    { level: 24, xp: 15314 },
    { level: 25, xp: 17418 },
    { level: 26, xp: 19777 },
    { level: 27, xp: 22420 },
    { level: 28, xp: 25377 },
    { level: 29, xp: 28686 },
    { level: 30, xp: 32384 },
    { level: 31, xp: 36516 },
    { level: 32, xp: 41129 },
    { level: 33, xp: 46277 },
    { level: 34, xp: 52018 },
    { level: 35, xp: 58418 },
    { level: 36, xp: 65549 },
    { level: 37, xp: 73490 },
    { level: 38, xp: 82329 },
    { level: 39, xp: 92164 },
    { level: 40, xp: 103103 },
    { level: 41, xp: 115263 },
    { level: 42, xp: 128778 },
    { level: 43, xp: 143792 },
    { level: 44, xp: 160465 },
    { level: 45, xp: 178974 },
    { level: 46, xp: 199516 },
    { level: 47, xp: 222305 },
    { level: 48, xp: 247580 },
    { level: 49, xp: 275604 },
    { level: 50, xp: 306667 },
    { level: 51, xp: 341089 },
    { level: 52, xp: 379223 },
    { level: 53, xp: 421458 },
    { level: 54, xp: 468224 },
    { level: 55, xp: 519993 },
    { level: 56, xp: 577289 },
    { level: 57, xp: 640686 },
    { level: 58, xp: 710818 },
    { level: 59, xp: 788385 },
    { level: 60, xp: 874155 },
    { level: 61, xp: 968979 },
    { level: 62, xp: 1073790 },
    { level: 63, xp: 1189619 },
    { level: 64, xp: 1317599 },
    { level: 65, xp: 1458980 },
    { level: 66, xp: 1615136 },
    { level: 67, xp: 1787583 },
    { level: 68, xp: 1977988 },
    { level: 69, xp: 2188186 },
    { level: 70, xp: 2420198 },
    { level: 71, xp: 2676248 },
    { level: 72, xp: 2958783 },
    { level: 73, xp: 3270497 },
    { level: 74, xp: 3614354 },
    { level: 75, xp: 3993613 },
    { level: 76, xp: 4411863 },
    { level: 77, xp: 4873050 },
    { level: 78, xp: 5381515 },
    { level: 79, xp: 5942031 },
    { level: 80, xp: 6559850 },
    { level: 81, xp: 7240746 },
    { level: 82, xp: 7991068 },
    { level: 83, xp: 8817798 },
    { level: 84, xp: 9728612 },
    { level: 85, xp: 10731949 },
    { level: 86, xp: 11837084 },
    { level: 87, xp: 13054215 },
    { level: 88, xp: 14394549 },
    { level: 89, xp: 15870404 },
    { level: 90, xp: 17495317 },
    { level: 91, xp: 19284164 },
    { level: 92, xp: 21253291 },
    { level: 93, xp: 23420660 },
    { level: 94, xp: 25806003 },
    { level: 95, xp: 28431001 },
    { level: 96, xp: 31319470 },
    { level: 97, xp: 34497572 },
    { level: 98, xp: 37994045 },
    { level: 99, xp: 41840452 },
    { level: 100, xp: 46071461 },
    { level: 101, xp: 50725144 },
    { level: 102, xp: 55843311 },
    { level: 103, xp: 61471875 },
    { level: 104, xp: 67661249 },
    { level: 105, xp: 74466788 },
    { level: 106, xp: 81949269 },
    { level: 107, xp: 90175414 },
    { level: 108, xp: 99218477 },
    { level: 109, xp: 109158870 },
    { level: 110, xp: 120084865 },
    { level: 111, xp: 132093351 },
    { level: 112, xp: 145290678 },
    { level: 113, xp: 159793567 },
    { level: 114, xp: 175730122 },
    { level: 115, xp: 193240929 },
    { level: 116, xp: 212480268 },
    { level: 117, xp: 233617435 },
    { level: 118, xp: 256838203 },
    { level: 119, xp: 282346407 },
    { level: 120, xp: 310365699 },
    { level: 121, xp: 341141457 },
    { level: 122, xp: 374942890 },
    { level: 123, xp: 412065335 },
    { level: 124, xp: 452832782 },
    { level: 125, xp: 497600641 },
    { level: 126, xp: 546758769 },
    { level: 127, xp: 600734795 },
    { level: 128, xp: 659997759 },
    { level: 129, xp: 725062105 },
    { level: 130, xp: 796492052 },
    { level: 131, xp: 874906386 },
    { level: 132, xp: 960983714 },
    { level: 133, xp: 1055468220 },
    { level: 134, xp: 1159175968 },
    { level: 135, xp: 1273001819 },
    { level: 136, xp: 1397926998 },
    { level: 137, xp: 1535027394 },
    { level: 138, xp: 1685482652 },
    { level: 139, xp: 1850586136 },
    { level: 140, xp: 2031755836 },
    { level: 141, xp: 2230546335 },
    { level: 142, xp: 2448661902 },
    { level: 143, xp: 2687970846 },
    { level: 144, xp: 2950521237 },
    { level: 145, xp: 3238558136 },
    { level: 146, xp: 3554542454 },
    { level: 147, xp: 3901171628 },
    { level: 148, xp: 4281402261 },
    { level: 149, xp: 4698474916 },
    { level: 150, xp: 5155941291 },
    { level: 151, xp: 5657693968 },
    { level: 152, xp: 6207999001 },
    { level: 153, xp: 6811531619 },
    { level: 154, xp: 7473415316 },
    { level: 155, xp: 8199264673 },
    { level: 156, xp: 8995232251 },
    { level: 157, xp: 9868059948 },
    { level: 158, xp: 10825135249 },
    { level: 159, xp: 11874552819 },
    { level: 160, xp: 13025181956 },
    { level: 161, xp: 14286740460 },
    { level: 162, xp: 15669875521 },
    { level: 163, xp: 17186252295 },
    { level: 164, xp: 18848650897 },
    { level: 165, xp: 20671072603 },
    { level: 166, xp: 22668856144 },
    { level: 167, xp: 24858805035 },
    { level: 168, xp: 27259326991 },
    { level: 169, xp: 29890586579 },
    { level: 170, xp: 32774672343 },
    { level: 171, xp: 35935779794 },
    { level: 172, xp: 39400411740 },
    { level: 173, xp: 43197597620 },
    { level: 174, xp: 47359133624 },
    { level: 175, xp: 51919845567 },
    { level: 176, xp: 56917876678 },
    { level: 177, xp: 62395002639 },
    { level: 178, xp: 68396976473 },
    { level: 179, xp: 74973906075 },
    { level: 180, xp: 82180667496 },
    { level: 181, xp: 90077357333 },
    { level: 182, xp: 98729787935 },
    { level: 183, xp: 108210029451 },
    { level: 184, xp: 118597003157 },
    { level: 185, xp: 129977130891 },
    { level: 186, xp: 142445045893 },
    { level: 187, xp: 156104370834 },
    { level: 188, xp: 171068569393 },
    { level: 189, xp: 187461878289 },
    { level: 190, xp: 205420327374 },
    { level: 191, xp: 225092856080 },
    { level: 192, xp: 246642535302 },
    { level: 193, xp: 270247904649 },
    { level: 194, xp: 296104435943 },
    { level: 195, xp: 324426134842 },
    { level: 196, xp: 355447293611 },
    { level: 197, xp: 389424409267 },
    { level: 198, xp: 426638282663 },
    { level: 199, xp: 467396315555 },
    { level: 200, xp: 512035024278 },
]

