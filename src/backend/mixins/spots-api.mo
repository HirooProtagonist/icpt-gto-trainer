import SpotTypes "../types/spots";
import SpotsLib "../lib/spots";
import Map "mo:core/Map";

mixin (spots : Map.Map<Text, SpotTypes.SolvedSpot>) {
  public shared query func listSpots(
    filters : ?SpotTypes.SpotFilters
  ) : async [SpotTypes.SolvedSpot] {
    SpotsLib.listSpots(spots, filters);
  };

  public shared query func getSpotById(
    id : Text
  ) : async ?SpotTypes.SolvedSpot {
    SpotsLib.getSpotById(spots, id);
  };

  public shared query func searchSpots(
    searchQuery : Text
  ) : async [SpotTypes.SolvedSpot] {
    SpotsLib.searchSpots(spots, searchQuery);
  };

  public shared func seedSampleSpots() : async () {
    SpotsLib.seedSampleSpots(spots);
  };
};
