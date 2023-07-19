import {PdfReader, Rule} from 'pdfreader'

//  function displayValue(d) {
//      console.log('hi', d)
//  }
// /
// const processItem = Rule.makeItemProcessor([
//     Rule.on(/^soap \"(.*)\"$/)
//         .extractRegexpValues()
//         .then(displayValue),
//     Rule.on(/^Value\:/)
//         .parseNextItemValue()
//         .then(displayValue),
//     // Rule.on(/^c1$/).parseTable(3).then(displayTable),
//     Rule.on(/^Values\:/)
//         .accumulateAfterHeading()
//         .then(displayValue),
// ]);
const words = ['Aceclofenac',  'ацеклофенак', 'Aripiprazole',  'арипіпразол', 'Pipecuronium bromide',  'піпекуронію бромід', 'преднізолону капронату', 'лідокаїну гідрохлориду', 'декспантенол',  'Prednisolone caproate', 'Lidocaine hydrochloride',  'Dexpanthenol', 'Chlormadinone', 'ethinylestradiol',  'хлормадинону ацетат', 'етинілестрадіол', 'Follitropin alfa',  'фолітропін альфа', 'Bromocriptine',  'бромокриптин', 'Phenylbutazone',  'фенілбутазон', 'Gestodene', 'ethinylestradiol', 'Mebendazole',  'мебендазол', 'Spironolactone',  'спіронолактон', 'Haloperidol',  'галоперидол', 'Haloperidol',  'галоперидол', 'Aprotinin', 'апротинін', 'Inosine pranobex',  'інозину пранобекс', 'Drospirenone ethinylestradiol',  'дроспіренон етинілестрадіол', 'Levamisole',  'левамізол', 'Lisinopril',  'лізіноприл', 'Lisinopril amlodipine',  'лізиноприл амлодипін', 'Levonorgestrel',  'левоноргестрел', 'Ulipristal',  'уліпристал', 'Levocetirizine',  'левоцетиризин', 'Vinpocetine',  'вінпоцетин', 'Vinpocetine',  'вінпоцетин', 'Famotidine' , 'фамотидин', 'imidazole metranidazole',  'метронідазол міконазолу', 'Lisinopril diuretics',  'лізиноприл гідрохлортіазид', 'Losartan diuretics' , 'лозартан гідрохлортіазид', 'Hyaluronic acid', 'гіалуронова кислота', 'Desogestrel' , 'дезогестрел', 'Estradiol' ,'естрадіол', 'Gestodene ethinylestradiol' , 'етинілестрадіол гестоден', 'Gestodene ethinylestradiol' , 'етинілестрадіол гестоден', 'Rosuvastatin',  'розувостатин', 'Drospirenone ethinylestradiol' , 'дроспіренону етинілестрадіол', 'Tolperisone hydrochloride',  'Lidocaine hydrochloride' , 'толперизон лідокаїн', 'Tolperisone',  'толперизон', 'Nifuroxazide',  'ніфуроксазид', 'Desogestrel ethinylestradiol',  'дезогестрелу етинілестрадіол', 'Norethisterone',  'норетистерон', 'Amlodipine',  'амлодипін', 'Oxytocin', 'окситоцин', 'Potassium aspartate', 'magnesium aspartate',  'калію аспарагінат', 'магнію аспарагінат', 'Potassium aspartate', 'magnesium aspartate',  'калію аспарагінат', 'магнію аспарагінат', 'Levonorgestrel',  'левоноргестрел', 'Trimetazidine',  'триметазидин', 'Ivabradine',  'івабрадин', 'Cariprazine',  'карипразин', 'Desogestrel ethinylestradiol',  'дезогестрелу етинілестрадіол', 'Paroxetine',  'пароксетин', 'Nandrolone',  'нандролон', 'Levonorgestrel ethinylestradiol',  'левоноргестрелу етинілестрадіол', 'Dienogest',  'дієногест', 'Losartan', 'лозартан', 'Dienogest ethinylestradiol', 'дієногесту  етинілестрадіол', 'Montelukast' , 'монтелукаст', 'Nifuroxazide',  'ніфуроксазид', 'Cinnarizine',  'цинаризин', 'Gabapentin',  'габапентин', 'Terbinafine',  'тербінафін', 'Levonorgestrel ethinylestradiol' , 'левоноргестрелу етинілестрадіол', 'Triamcinolone',  'тріамцинолон', 'Norelgestromin ethinylestradiol',  'норелгестроміну етинілестрадіолу', 'Drospirenone',  'Estradiol', 'Estetrol',  'Drospirenone', 'Relugolix Estradiol', 'Norethisterone acetate']
const foundedWords = {

}
new PdfReader().parseFileItems("./static/tes.pdf", (err, item) => {
    if (err) console.error("error:", err);
    else if (!item) {
         console.log('В даному документі знайдені наступні діючі речовини: ')
        for (const key in foundedWords) {
            console.log(`Речовина ${key} згадується ${foundedWords[key].number} раз.`)
        }
    }
    else if (item.text) {
        const textLowerCase = item.text.toLowerCase()
        for (let i = 0; i < words.length; i++) {
            const word = words[i].toLowerCase()

            if(textLowerCase.includes(word)) {
                if(foundedWords[word]) {
                    foundedWords[word].number += 1
                }else {
                    foundedWords[word] = {number: 1}
                }
            }

        }
    }
});

