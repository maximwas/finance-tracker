import { type JSX } from 'react';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export default async function Login(): Promise<JSX.Element> {
  return (
    <Card className="">
      <CardHeader className="">
        <div className="text-center">
          <CardTitle>FinTracker</CardTitle>
          <CardDescription>Sign in to your financial world</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}
