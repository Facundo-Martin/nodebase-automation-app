type Props = {
  params: Promise<{ executionId: string }>;
};

export default async function Page({ params }: Props) {
  const { executionId } = await params;
  return <div>Execution Id: {executionId}</div>;
}
