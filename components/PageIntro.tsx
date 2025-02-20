import PageDescription from './PageDescription';
import PageTitle from './PageTitle';

export default function PageIntro({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mt-5 flex flex-col gap-[14px]">
      <PageTitle text={title} />
      {description && <PageDescription text={description} />}
    </div>
  );
}
