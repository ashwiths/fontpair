import { useState, useEffect } from 'react'

export function useWindowVirtualList(ref, items, itemHeight, buffer = 5) {
  const [scrollTop, setScrollTop] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight)
  const [containerOffset, setContainerOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY)
    }
    const handleResize = () => {
      setViewportHeight(window.innerHeight)
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        setContainerOffset(rect.top + window.scrollY)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    // Measure initial values
    setScrollTop(window.scrollY)
    setViewportHeight(window.innerHeight)
    
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setContainerOffset(rect.top + window.scrollY)
    }

    // Secondary delayed check to allow page styles/fonts to settle
    const timer = setTimeout(() => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        setContainerOffset(rect.top + window.scrollY)
      }
    }, 150)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [ref])

  // Recalculate container offset if items list changes length
  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setContainerOffset(rect.top + window.scrollY)
    }
  }, [items.length, ref])

  const relativeScrollTop = Math.max(0, scrollTop - containerOffset)
  const startIndex = Math.max(0, Math.floor(relativeScrollTop / itemHeight) - buffer)
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((relativeScrollTop + viewportHeight) / itemHeight) + buffer
  )

  const totalHeight = items.length * itemHeight

  const visibleItems = []
  for (let i = startIndex; i <= endIndex; i++) {
    if (items[i]) {
      visibleItems.push({
        item: items[i],
        index: i,
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: `${itemHeight}px`,
          transform: `translateY(${i * itemHeight}px)`,
        }
      })
    }
  }

  return {
    visibleItems,
    containerStyle: {
      position: 'relative',
      height: `${totalHeight}px`,
      width: '100%',
    }
  }
}

export function useGridVirtualList(ref, items, itemHeight, getColumnCount, buffer = 5) {
  const [scrollTop, setScrollTop] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight)
  const [containerOffset, setContainerOffset] = useState(0)
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY)
    }
    const handleResize = () => {
      setViewportHeight(window.innerHeight)
      setWidth(window.innerWidth)
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        setContainerOffset(rect.top + window.scrollY)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    setScrollTop(window.scrollY)
    setViewportHeight(window.innerHeight)
    
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setContainerOffset(rect.top + window.scrollY)
    }

    const timer = setTimeout(() => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        setContainerOffset(rect.top + window.scrollY)
      }
    }, 150)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [ref])

  // Recalculate container offset if items list changes
  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setContainerOffset(rect.top + window.scrollY)
    }
  }, [items.length, ref])

  const columns = getColumnCount(width)
  const rowCount = Math.ceil(items.length / columns)
  const totalHeight = rowCount * itemHeight

  const relativeScrollTop = Math.max(0, scrollTop - containerOffset)
  const startRow = Math.max(0, Math.floor(relativeScrollTop / itemHeight) - buffer)
  const endRow = Math.min(rowCount - 1, Math.ceil((relativeScrollTop + viewportHeight) / itemHeight) + buffer)

  const visibleItems = []
  for (let r = startRow; r <= endRow; r++) {
    for (let c = 0; c < columns; c++) {
      const idx = r * columns + c
      if (idx < items.length) {
        visibleItems.push({
          item: items[idx],
          index: idx,
          style: {
            position: 'absolute',
            top: 0,
            left: `${(c / columns) * 100}%`,
            width: `${100 / columns}%`,
            height: `${itemHeight}px`,
            transform: `translateY(${r * itemHeight}px)`,
          }
        })
      }
    }
  }

  return {
    visibleItems,
    containerStyle: {
      position: 'relative',
      height: `${totalHeight}px`,
      width: '100%',
    },
    columns
  }
}
