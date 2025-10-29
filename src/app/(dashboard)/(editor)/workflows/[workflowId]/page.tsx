type Props = {
  params: Promise<{ workflowId: string }>;
};

export default async function Page({ params }: Props) {
  const { workflowId } = await params;
  return <div>Workflow Id: {workflowId}</div>;
}
