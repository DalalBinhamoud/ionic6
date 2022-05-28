import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HideHeaderDirective } from './hide-header.directive'
import { SteckySegmentDirective } from './stecky-segment.directive'

@NgModule({
  declarations: [HideHeaderDirective, SteckySegmentDirective],
  imports: [CommonModule],
  exports: [HideHeaderDirective, SteckySegmentDirective],
})
export class SharedDirectivesModule {}
