export interface respones{
    status:string,
    message:string,
    data:any
}

export interface accountModel{
    account:string,
    password:string
}

export interface Company{
    id: number,
    companyNumber: string,
    companyName: string,
    susESG: string,
    msciESG: string,
    ftseESG: string,
    issESG: string,
    sapESG: string,
    twCompanyRank: string,
    refi: string
}

export interface CompanyList{
    Company:Company[]
}
