export interface Group {
    pos: number;
    repeat: boolean;
    optional: boolean;
}
export interface RouteRegex {
    groups: Record<string, Group>;
    re: RegExp;
}
/**
 * From a normalized route this function generates a regular expression and
 * a corresponding groups object intended to be used to store matching groups
 * from the regular expression.
 */
export declare function getRouteRegex(normalizedRoute: string): RouteRegex;
