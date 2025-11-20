import { CompanyModel } from "@/types";
import { msftCompany } from "@/lib/data/companies/msft";
import { aaplCompany } from "@/lib/data/companies/aapl";
import { amznCompany } from "@/lib/data/companies/amzn";
import { googlCompany } from "@/lib/data/companies/googl";
import { nvdaCompany } from "@/lib/data/companies/nvda";
import { nflxCompany } from "@/lib/data/companies/nflx";
import { metaCompany } from "@/lib/data/companies/meta";
import { amdCompany } from "@/lib/data/companies/amd";

const catalog: CompanyModel[] = [msftCompany, aaplCompany, amznCompany, googlCompany, nvdaCompany, nflxCompany, metaCompany, amdCompany];

export const companyRegistry: Record<string, CompanyModel> = catalog.reduce(
  (acc, company) => {
    acc[company.symbol] = company;
    return acc;
  },
  {} as Record<string, CompanyModel>
);

export const companyOptions = catalog.map(({ symbol, name }) => ({ symbol, name }));

export const defaultCompanySymbol = catalog[0].symbol;
