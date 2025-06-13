import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import BrandTable from "./category-table";

export default function Dashboard() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="space-y-2">
        <Card x-chunk="dashboard-06-chunk-0" className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">Category</CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400">Quản lý Category</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense>
              <Suspense>
                <BrandTable />
              </Suspense>
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
