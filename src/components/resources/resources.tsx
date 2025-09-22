import ResourceCards from "./resourceCards";

export default function Resources() {
  return (
    <div className="h-full w-full">
      <div className="grid grid-cols-1 place-items-center gap-12 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
        <ResourceCards
          name="Relief Web API"
          imgSrc="/images/resources/reliefweb.png"
          description="A repository of humanitarian information and resources to help respond to crises and promote social inclusion in times of conflict or natural disasters."
          link="https://reliefweb.int/help/api"
        />
        <ResourceCards
          name="Google Healthcare API"
          imgSrc="/images/resources/googleCloud.png"
          description="Rapidly build intelligent healthcare solutions in the cloud. Help protect your healthcare data while meeting industry-specific security, privacy, and compliance requirements."
          link="https://cloud.google.com/healthcare-api/"
        />
        <ResourceCards
          name="United Nations SDG API"
          imgSrc="/images/resources/sdg.png"
          description="The UN SDG API returns official reported SDG data. It is ideal for build dashboards, tracking progress, or conducting research on global development."
          link="https://unstats.un.org/sdgapi/swagger/#/"
        />
      </div>
    </div>
  );
}
