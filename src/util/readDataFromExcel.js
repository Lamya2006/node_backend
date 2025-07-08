const reader = require('xlsx')

const readData =(filePath)=>{

    const data=[]
    const file = reader.readFile(filePath)
    // console.log(filePath)
    const sheets = file.SheetNames
    for(let i=0;i<=sheets.length;i++)
    {
        const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]])
        temp.forEach(res => {
            data.push(res)
        }); 
    }

    
    

    return data

}

module.exports = readData
