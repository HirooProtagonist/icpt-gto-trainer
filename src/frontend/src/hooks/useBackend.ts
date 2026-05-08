import { createActor } from "@/backend";
import type {
  SolvedSpot,
  SpotFilters,
  StatsPublic,
  UserProfilePublic,
  UserProfileSettings,
} from "@/backend";
import { SAMPLE_SPOTS as sampleSpots } from "@/lib/sampleData";
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

export function useUpdateUserSettings() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (settings: UserProfileSettings) => {
      if (!actor) throw new Error("No actor");
      return actor.createOrUpdateUser(settings);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
}

export function useUpdateUserStats() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (stats: StatsPublic) => {
      if (!actor) throw new Error("No actor");
      return actor.updateUserStats(stats);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
}

export function useListSpots(filters: SpotFilters | null = null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SolvedSpot[]>({
    queryKey: ["spots", filters],
    queryFn: async () => {
      if (!actor) return sampleSpots as unknown as SolvedSpot[];
      try {
        const result = await actor.listSpots(filters);
        return result.length > 0
          ? result
          : (sampleSpots as unknown as SolvedSpot[]);
      } catch {
        return sampleSpots as unknown as SolvedSpot[];
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
  });
}

export function useGetSpot(id: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SolvedSpot | null>({
    queryKey: ["spot", id],
    queryFn: async () => {
      if (!actor)
        return (
          (sampleSpots as unknown as SolvedSpot[]).find((s) => s.id === id) ??
          null
        );
      try {
        const result = await actor.getSpotById(id);
        return (
          result ??
          (sampleSpots as unknown as SolvedSpot[]).find((s) => s.id === id) ??
          null
        );
      } catch {
        return (
          (sampleSpots as unknown as SolvedSpot[]).find((s) => s.id === id) ??
          null
        );
      }
    },
    enabled: !!id && !isFetching,
    staleTime: 60_000,
  });
}

export function useSearchSpots(query: string) {
  const { actor, isFetching } = useActor(createActor);
  const spots = sampleSpots as unknown as SolvedSpot[];
  return useQuery<SolvedSpot[]>({
    queryKey: ["spots", "search", query],
    queryFn: async () => {
      if (!actor || !query.trim()) return [];
      try {
        return await actor.searchSpots(query);
      } catch {
        const q = query.toLowerCase();
        return spots.filter(
          (s) =>
            s.description.toLowerCase().includes(q) ||
            s.positions.some((p) => p.toLowerCase().includes(q)) ||
            s.street.toLowerCase().includes(q),
        );
      }
    },
    enabled: !!query.trim() && !isFetching,
    staleTime: 30_000,
  });
}
