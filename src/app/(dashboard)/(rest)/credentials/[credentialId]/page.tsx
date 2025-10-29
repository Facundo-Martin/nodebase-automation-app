type Props = {
  params: Promise<{ credentialId: string }>;
};

export default async function Page({ params }: Props) {
  const { credentialId } = await params;
  return <div>Credential Id: {credentialId}</div>;
}
