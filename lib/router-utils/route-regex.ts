import { removeTrailingSlash } from './remove-trailing-slash'
import { escapeStringRegexp } from 'next/dist/shared/lib/escape-regexp';
import { INTERCEPTION_ROUTE_MARKERS } from 'next/dist/server/future/helpers/interception-routes';

export interface Group {
  pos: number
  repeat: boolean
  optional: boolean
}

export interface RouteRegex {
  groups: Record<string, Group>
  re: RegExp
}

/**
 * Parses a given parameter from a route to a data structure that can be used
 * to generate the parametrized route. Examples:
 *   - `[...slug]` -> `{ key: 'slug', repeat: true, optional: true }`
 *   - `...slug` -> `{ key: 'slug', repeat: true, optional: false }`
 *   - `[foo]` -> `{ key: 'foo', repeat: false, optional: true }`
 *   - `bar` -> `{ key: 'bar', repeat: false, optional: false }`
 */
function parseParameter(param: string) {
  const optional = param.startsWith('[') && param.endsWith(']')
  if (optional) {
    param = param.slice(1, -1)
  }
  const repeat = param.startsWith('...')
  if (repeat) {
    param = param.slice(3)
  }
  return { key: param, repeat, optional }
}

function getParametrizedRoute(route: string) {
  const segments = removeTrailingSlash(route).slice(1).split('/')
  const groups: Record<string, Group> = {}
  let groupIndex = 1
  return {
    parameterizedRoute: segments
      .map((segment) => {
        const markerMatch = INTERCEPTION_ROUTE_MARKERS.find((m) =>
          segment.startsWith(m)
        )
        const paramMatches = segment.match(/\[((?:\[.*\])|.+)\]/) // Check for parameters

        if (markerMatch && paramMatches) {
          const { key, optional, repeat } = parseParameter(paramMatches[1])
          groups[key] = { pos: groupIndex++, repeat, optional }
          return `/${escapeStringRegexp(markerMatch)}([^/]+?)`
        } else if (paramMatches) {
          const { key, repeat, optional } = parseParameter(paramMatches[1])
          groups[key] = { pos: groupIndex++, repeat, optional }
          return repeat ? (optional ? '(?:/(.+?))?' : '/(.+?)') : '/([^/]+?)'
        } else {
          return `/${escapeStringRegexp(segment)}`
        }
      })
      .join(''),
    groups,
  }
}

/**
 * From a normalized route this function generates a regular expression and
 * a corresponding groups object intended to be used to store matching groups
 * from the regular expression.
 */
export function getRouteRegex(normalizedRoute: string): RouteRegex {
  const { parameterizedRoute, groups } = getParametrizedRoute(normalizedRoute)
  return {
    re: new RegExp(`^${parameterizedRoute}(?:/)?$`),
    groups: groups,
  }
}
