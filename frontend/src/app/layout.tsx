import ApolloWrapper from "@/components/ApolloWrapper";

export interface IRootLayout {
  children: React.ReactNode
}

export default function RootLayout({ children }: IRootLayout) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          { children }
        </ApolloWrapper>
      </body>
    </html>
  );
}
