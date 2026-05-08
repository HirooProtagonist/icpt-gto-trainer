import { createActor } from "@/backend";
import type {
  HandHistory,
  ParsedHand,
  SolvedSpot,
  SpotFilters,
  StatsPublic,
  UserProfilePublic,
  UserProfileSettings,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useUserProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserProfilePublic | null>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useListSpots(filters: SpotFilters | null = null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SolvedSpot[]>({
    queryKey: ["spots", filters],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listSpots(filters);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSearchSpots(query: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SolvedSpot[]>({
    queryKey: ["spots", "search", query],
    queryFn: async () => {
      if (!actor) return [];
      return actor.searchSpots(query);
    },
    enabled: !!actor && !isFetching && query.length > 0,
  });
}

export function useGetSpotById(id: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SolvedSpot | null>({
    queryKey: ["spot", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSpotById(id);
    },
    enabled: !!actor && !isFetching && id.length > 0,
  });
}

export function useHandHistory() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<HandHistory[]>({
    queryKey: ["handHistory"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUserHandHistory();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddHandHistory() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<HandHistory, Error, ParsedHand[]>({
    mutationFn: async (hands) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addHandHistory(hands);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["handHistory"] });
    },
  });
}

export function useUpdateUserStats() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<void, Error, StatsPublic>({
    mutationFn: async (stats) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateUserStats(stats);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
}

export function useCreateOrUpdateUser() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<UserProfilePublic, Error, UserProfileSettings>({
    mutationFn: async (settings) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createOrUpdateUser(settings);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
}
