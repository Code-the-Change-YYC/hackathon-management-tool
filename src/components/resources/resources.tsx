import ResourceCards from "./resourceCards";

export default function Resources() {
  return (
    <div className="h-full w-full">
      <div className="mx-4 -mt-5 grid grid-cols-1 justify-items-center gap-y-12 md:mt-0 md:grid-cols-2 lg:mx-10 lg:gap-y-20 xl:mx-6 xl:grid-cols-3 xl:gap-y-16">
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
        <ResourceCards
          name="Syncloops API"
          imgSrc="/images/resources/syncloop.png"
          description="Collects and aggregate data from diverse sources, with real-time communication to automate and streamline public services."
          link="https://www.syncloop.com/index.html"
        />
        <ResourceCards
          name="Carbon Interface API"
          imgSrc="/images/resources/carbonInterface.png"
          description="Provides data on carbon emissions, supporting efforts to combat climate change by estimating carbon footprints."
          link="https://www.carboninterface.com/"
        />
        <ResourceCards
          name="OpenStreetMap API"
          imgSrc="/images/resources/Openstreetmap.png"
          description="A collaborative map platform offering detailed maps worldwide, which can be used for mapping underserved areas or displaced communities."
          link="https://wiki.openstreetmap.org/wiki/API"
        />
        <ResourceCards
          name="Mapbox API"
          imgSrc="/images/resources/mapbox.png"
          description="Offers services like Maps, Navigation, Search, and real-time data integration to build interactive, customizable maps, and geospatial applications, "
          link="https://docs.mapbox.com/api/guides/"
        />
        <ResourceCards
          name="World Bank API"
          imgSrc="/images/resources/worldBank.png"
          description="Provides access to global development data, including economic, social, and environmental indicators across countries."
          link="https://documents.worldbank.org/en/publication/documents-reports/api"
        />
        <ResourceCards
          name="Socrata API"
          imgSrc="/images/resources/socrata.png"
          description="The Socrata Open Data API allows you to programmatically access a wealth of open data resources from governments, non-profits, and NGOs around the world."
          link="https://dev.socrata.com/docs/endpoints.html"
        />
        <ResourceCards
          name="OpenWeather API"
          imgSrc="/images/resources/openWeather.png"
          description="Provides access to global weather data, including current conditions, forecasts, historical data, and climate metrics."
          link="https://openweathermap.org/api"
        />
      </div>
    </div>
  );
}
