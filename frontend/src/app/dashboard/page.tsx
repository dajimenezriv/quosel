import { BaseLayout } from "@/components/layouts/base-layout";
import { DataTable } from "./components/data-table";

import data from "./data/data.json";
import pastPerformanceData from "./data/past-performance-data.json";
import keyPersonnelData from "./data/key-personnel-data.json";
import focusDocumentsData from "./data/focus-documents-data.json";

export default function Page() {
  return (
    <BaseLayout title="Dashboard" description="Welcome to your admin dashboard">
      <div className="@container/main">
        <DataTable
          data={data}
          pastPerformanceData={pastPerformanceData}
          keyPersonnelData={keyPersonnelData}
          focusDocumentsData={focusDocumentsData}
        />
      </div>
    </BaseLayout>
  );
}
